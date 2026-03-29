import {inject, Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {WorkoutPattern} from '../../models/workoutPattern';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkoutPatternService {
    private workoutPatternsChanged$ = new BehaviorSubject<void>(undefined);
    private storageService: StorageService = inject(StorageService);

    public async getWorkoutPatterns(): Promise<WorkoutPattern[]> {
        return (await this.storageService.get('workoutPatterns')) || [];
    }

    public async addWorkoutPattern(workoutPattern: WorkoutPattern,): Promise<void> {
        const workoutPatterns: WorkoutPattern[] = await this.getWorkoutPatterns();
        workoutPatterns.push(workoutPattern);
        await this.storageService.set('workoutPatterns', workoutPatterns);
        this.workoutPatternsChanged$.next();
    }

    public async removeWorkoutPattern(id: number): Promise<void> {
        const workoutPatterns: WorkoutPattern[] = await this.getWorkoutPatterns();
        workoutPatterns.splice(id, 1);
        await this.storageService.set('workoutPatterns', workoutPatterns);
        this.workoutPatternsChanged$.next();
    }

    public async removeAllWorkoutPatterns(): Promise<void> {
        await this.storageService.set('workoutPatterns', []);
        this.workoutPatternsChanged$.next();
    }

    public onWorkoutPatternsChange = () =>
        this.workoutPatternsChanged$.asObservable();
}
