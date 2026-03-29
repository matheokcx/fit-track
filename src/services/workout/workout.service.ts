import {inject, Injectable} from '@angular/core';
import {StorageService, SqlStatement} from '../storage/storage.service';
import {FinishedExercise, Workout} from '../../models/workout';
import {WorkoutPattern} from '../../models/workoutPattern';
import {Exercise} from '../../models/exercise';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private workoutsChanged$ = new BehaviorSubject<void>(undefined);
    private storageService: StorageService = inject(StorageService);

    public async getWorkouts(): Promise<Workout[]> {
        const workoutRows = await this.storageService.query<{
            id: number;
            pattern_id: number;
            starting_hour: string | null;
            end_hour: string | null;
            feeling: string | null;
            observation: string | null;
            pattern_name: string;
        }>(
            `SELECT w.id, w.pattern_id, w.starting_hour, w.end_hour, w.feeling, w.observation,
                    wp.name as pattern_name
             FROM workout w
             JOIN workout_pattern wp ON w.pattern_id = wp.id
             ORDER BY w.id`
        );

        const workouts: Workout[] = [];

        for (const row of workoutRows) {
            const pattern = await this.buildPattern(row.pattern_id, row.pattern_name);
            const finishedExercises = await this.getFinishedExercises(row.id);

            workouts.push({
                id: row.id,
                pattern,
                startingHour: row.starting_hour,
                endHour: row.end_hour,
                finishedExercise: finishedExercises,
                feeling: row.feeling as Workout['feeling'],
                observation: row.observation,
            });
        }

        return workouts;
    }

    public async getWorkout(id: number): Promise<Workout | undefined> {
        const rows = await this.storageService.query<{
            id: number;
            pattern_id: number;
            starting_hour: string | null;
            end_hour: string | null;
            feeling: string | null;
            observation: string | null;
            pattern_name: string;
        }>(
            `SELECT w.id, w.pattern_id, w.starting_hour, w.end_hour, w.feeling, w.observation,
                    wp.name as pattern_name
             FROM workout w
             JOIN workout_pattern wp ON w.pattern_id = wp.id
             WHERE w.id = ?`,
            [id]
        );

        if (rows.length === 0) return undefined;

        const row = rows[0];
        const pattern = await this.buildPattern(row.pattern_id, row.pattern_name);
        const finishedExercises = await this.getFinishedExercises(row.id);

        return {
            id: row.id,
            pattern,
            startingHour: row.starting_hour,
            endHour: row.end_hour,
            finishedExercise: finishedExercises,
            feeling: row.feeling as Workout['feeling'],
            observation: row.observation,
        };
    }

    public async addWorkout(workout: Workout): Promise<void> {
        const existingNegativeWeight: boolean = workout.finishedExercise.some(
            (exercise: FinishedExercise) => (exercise.maxWeight ?? 0) < 0
        );
        if (existingNegativeWeight) return;

        const workoutId = await this.storageService.run(
            `INSERT INTO workout (pattern_id, starting_hour, end_hour, feeling, observation)
             VALUES (?, ?, ?, ?, ?)`,
            [workout.pattern.id, workout.startingHour, workout.endHour, workout.feeling, workout.observation]
        );

        await this.insertFinishedExercises(workoutId, workout.finishedExercise);
        this.workoutsChanged$.next();
    }

    public async setWorkout(id: number, workout: Workout): Promise<void> {
        await this.storageService.run(
            `UPDATE workout SET pattern_id = ?, starting_hour = ?, end_hour = ?, feeling = ?, observation = ?
             WHERE id = ?`,
            [workout.pattern.id, workout.startingHour, workout.endHour, workout.feeling, workout.observation, id]
        );

        await this.storageService.run('DELETE FROM finished_exercise WHERE workout_id = ?', [id]);
        await this.insertFinishedExercises(id, workout.finishedExercise);
        this.workoutsChanged$.next();
    }

    public async removeWorkout(id: number): Promise<void> {
        await this.storageService.run('DELETE FROM workout WHERE id = ?', [id]);
        this.workoutsChanged$.next();
    }

    public async removeAllWorkouts(): Promise<void> {
        await this.storageService.execute('DELETE FROM workout;');
        this.workoutsChanged$.next();
    }

    public onWorkoutsChange = () => this.workoutsChanged$.asObservable();

    private async insertFinishedExercises(workoutId: number, exercises: FinishedExercise[]): Promise<void> {
        const set: SqlStatement[] = exercises.map((fe) => ({
            statement: 'INSERT INTO finished_exercise (workout_id, exercise_id, max_weight) VALUES (?, (SELECT id FROM exercise WHERE name = ?), ?)',
            values: [workoutId, fe.exercise.name, fe.maxWeight],
        }));

        await this.storageService.executeSet(set);
    }

    private async buildPattern(patternId: number, patternName: string): Promise<WorkoutPattern> {
        const exerciseRows = await this.storageService.query<{
            exercise_id: number;
            name: string;
            description: string;
            energy: number;
            break_time: number;
            image: string | null;
        }>(
            `SELECT e.id as exercise_id, e.name, e.description, e.energy, e.break_time, e.image
             FROM workout_pattern_exercise wpe
             JOIN exercise e ON wpe.exercise_id = e.id
             WHERE wpe.pattern_id = ?
             ORDER BY wpe.position`,
            [patternId]
        );

        const exercises: Exercise[] = [];
        for (const er of exerciseRows) {
            const muscles = await this.getExerciseMuscles(er.exercise_id);
            exercises.push({
                name: er.name,
                description: er.description,
                energy: er.energy,
                breakTime: er.break_time,
                image: er.image,
                usedMuscles: muscles,
            });
        }

        return {id: patternId, name: patternName, exercises};
    }

    private async getFinishedExercises(workoutId: number): Promise<FinishedExercise[]> {
        const rows = await this.storageService.query<{
            exercise_id: number;
            name: string;
            description: string;
            energy: number;
            break_time: number;
            image: string | null;
            max_weight: number | null;
        }>(
            `SELECT e.id as exercise_id, e.name, e.description, e.energy, e.break_time, e.image, fe.max_weight
             FROM finished_exercise fe
             JOIN exercise e ON fe.exercise_id = e.id
             WHERE fe.workout_id = ?`,
            [workoutId]
        );

        const result: FinishedExercise[] = [];
        for (const row of rows) {
            const muscles = await this.getExerciseMuscles(row.exercise_id);
            result.push({
                exercise: {
                    name: row.name,
                    description: row.description,
                    energy: row.energy,
                    breakTime: row.break_time,
                    image: row.image,
                    usedMuscles: muscles,
                },
                maxWeight: row.max_weight,
            });
        }

        return result;
    }

    private async getExerciseMuscles(exerciseId: number): Promise<string[]> {
        const rows = await this.storageService.query<{muscle: string}>(
            'SELECT muscle FROM exercise_muscle WHERE exercise_id = ?',
            [exerciseId]
        );
        return rows.map((r) => r.muscle);
    }
}
