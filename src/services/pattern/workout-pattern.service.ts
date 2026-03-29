import {inject, Injectable} from '@angular/core';
import {StorageService, SqlStatement} from '../storage/storage.service';
import {WorkoutPattern} from '../../models/workoutPattern';
import {Exercise} from '../../models/exercise';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkoutPatternService {
    private workoutPatternsChanged$ = new BehaviorSubject<void>(undefined);
    private storageService: StorageService = inject(StorageService);

    public async getWorkoutPatterns(): Promise<WorkoutPattern[]> {
        const patternRows = await this.storageService.query<{id: number; name: string}>(
            'SELECT id, name FROM workout_pattern ORDER BY id'
        );

        const patterns: WorkoutPattern[] = [];

        for (const row of patternRows) {
            const exercises = await this.getPatternExercises(row.id);
            patterns.push({id: row.id, name: row.name, exercises});
        }

        return patterns;
    }

    public async addWorkoutPattern(workoutPattern: WorkoutPattern): Promise<void> {
        const patternId = await this.storageService.run(
            'INSERT INTO workout_pattern (name) VALUES (?)',
            [workoutPattern.name]
        );

        const set: SqlStatement[] = workoutPattern.exercises.map((exercise, index) => ({
            statement: 'INSERT INTO workout_pattern_exercise (pattern_id, exercise_id, position) VALUES (?, (SELECT id FROM exercise WHERE name = ?), ?)',
            values: [patternId, exercise.name, index],
        }));

        await this.storageService.executeSet(set);
        this.workoutPatternsChanged$.next();
    }

    public async removeWorkoutPattern(id: number): Promise<void> {
        await this.storageService.run('DELETE FROM workout_pattern WHERE id = ?', [id]);
        this.workoutPatternsChanged$.next();
    }

    public async removeAllWorkoutPatterns(): Promise<void> {
        await this.storageService.execute('DELETE FROM workout_pattern;');
        this.workoutPatternsChanged$.next();
    }

    public onWorkoutPatternsChange = () =>
        this.workoutPatternsChanged$.asObservable();

    private async getPatternExercises(patternId: number): Promise<Exercise[]> {
        const rows = await this.storageService.query<{
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
        for (const row of rows) {
            const muscleRows = await this.storageService.query<{muscle: string}>(
                'SELECT muscle FROM exercise_muscle WHERE exercise_id = ?',
                [row.exercise_id]
            );
            exercises.push({
                name: row.name,
                description: row.description,
                energy: row.energy,
                breakTime: row.break_time,
                image: row.image,
                usedMuscles: muscleRows.map((m) => m.muscle),
            });
        }

        return exercises;
    }
}
