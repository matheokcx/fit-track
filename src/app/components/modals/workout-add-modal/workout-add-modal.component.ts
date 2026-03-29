import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IonButton, IonContent, IonIcon, IonSelect, IonSelectOption,} from '@ionic/angular/standalone';
import {WorkoutPattern,} from '../../../../models/workoutPattern';
import {addIcons} from 'ionicons';
import {WorkoutPatternService} from '../../../../services/pattern/workout-pattern.service';
import {Subscription} from 'rxjs';
import {WorkoutService} from '../../../../services/workout/workout.service';
import {Workout} from '../../../../models/workout';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {addCircle} from 'ionicons/icons';

@Component({
    selector: 'app-workout-add-modal',
    templateUrl: './workout-add-modal.component.html',
    styleUrls: ['./workout-add-modal.component.scss'],
    imports: [
        IonContent,
        IonSelect,
        IonButton,
        IonSelectOption,
        FormsModule,
        RouterLink,
        IonIcon
    ]
})
export class WorkoutAddModalComponent implements OnInit, OnDestroy {
    protected workoutPatterns: WorkoutPattern[] = [];
    protected choosePattern!: WorkoutPattern;
    private workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
    private workoutService: WorkoutService = inject(WorkoutService);
    private subscription: Subscription = new Subscription();

    public constructor() {
        addIcons({ addCircle });
    }

    public async ngOnInit(): Promise<void> {
        await this.loadWorkoutPatterns();
        this.subscription.add(
            this.workoutPatternService.onWorkoutPatternsChange()
                .subscribe(() => this.loadWorkoutPatterns()),
        );
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private async loadWorkoutPatterns(): Promise<void> {
        this.workoutPatterns = await this.workoutPatternService.getWorkoutPatterns();
    }

    protected async addWorkout(): Promise<void> {
        const workouts: Workout[] = await this.workoutService.getWorkouts();
        const newID: number | undefined = workouts[workouts.length - 1]?.id + 1;
        const newWorkout: Workout = {
            id: workouts.length === 0 ? 0 : newID,
            pattern: this.choosePattern,
            startingHour: null,
            endHour: null,
            finishedExercise: [],
            feeling: null,
            observation: null
        };
        await this.workoutService.addWorkout(newWorkout);
    }
}
