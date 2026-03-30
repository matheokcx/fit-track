import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonListHeader,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Workout} from '../../../models/workout';
import {WorkoutService} from '../../../services/workout/workout.service';
import {addIcons} from 'ionicons';
import {flashOutline} from 'ionicons/icons';
import {WorkoutFeelingIconPipe} from '../../../pipes/workout-feeling-icon/workout-feeling-icon.pipe';
import {WorkoutFeelingIconColorPipe} from '../../../pipes/workout-feeling-icon/workout-feeling-icon-color.pipe';
import {ExerciseCardComponent} from '../../components/cards/exercise-card/exercise-card.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-workout-details',
    templateUrl: './workout-details.page.html',
    styleUrls: ['./workout-details.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        IonListHeader,
        IonLabel,
        IonList,
        IonText,
        IonButtons,
        IonBackButton,
        IonIcon,
        WorkoutFeelingIconPipe,
        WorkoutFeelingIconColorPipe,
        ExerciseCardComponent,
        IonButton,
        RouterLink
    ]
})
export class WorkoutDetailsPage implements OnInit {
    protected workout!: Workout;
    protected readonly Array = Array;
    private route: ActivatedRoute = inject(ActivatedRoute);
    private workoutService: WorkoutService = inject(WorkoutService);
    private subscription: Subscription = new Subscription();

    public constructor() {
        addIcons({ flashOutline });
    }

    public async ngOnInit(): Promise<void> {
        const idWorkout: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
        const workouts: Workout[] = await this.workoutService.getWorkouts();
        this.workout = (await this.workoutService.getWorkout(idWorkout)) || workouts[0];
        this.subscription.add(
            this.workoutService.onWorkoutsChange().subscribe(() => this.reloadTheWorkout())
        );
    }

    private async reloadTheWorkout(): Promise<void> {
        const workouts: Workout[] = await this.workoutService.getWorkouts();
        this.workout = workouts[this.workout.id];
    }

    protected getFeeling = (): string => this.workout?.feeling || 'GOOD';

    protected getCompletion(): string {
        return `(${this.workout?.finishedExercise.length}/${this.workout?.pattern.exercises.length} faits)`;
    }

    protected getDuration(): string {
        if (!this.workout?.startingHour || !this.workout?.endHour) {
            return '--';
        }

        const endHour: string = this.workout.endHour.split(':')[0];
        const endMinute: string = this.workout.endHour.split(':')[1];
        const startingHour: string = this.workout.startingHour.split(':')[0];
        const startingMinute: string = this.workout.startingHour.split(':')[1];

        let duration: number = parseInt(endHour) * 60 + parseInt(endMinute) - (parseInt(startingHour) * 60 + parseInt(startingMinute));

        if (duration < 0) {
            duration += 1440;
        }

        const hours: number = Math.floor(duration / 60);
        const minutes: number = duration % 60;

        return `${hours}h${minutes}min`;
    }
}
