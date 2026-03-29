import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import {WorkoutPattern} from '../../../models/workoutPattern';
import {Exercise, EXERCISES} from '../../../models/exercise';
import {addCircleOutline} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Router} from '@angular/router';
import {WorkoutPatternService} from '../../../services/pattern/workout-pattern.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-pattern-add',
    templateUrl: './pattern-add.page.html',
    styleUrls: ['./pattern-add.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        CommonModule,
        FormsModule,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonIcon,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonBackButton,
        IonButtons,
        IonFooter
    ]
})
export class PatternAddPage {
    protected patternName: string = '';
    protected selectedExerciseNames: string[] = [];
    protected allExercises: Exercise[] = EXERCISES;
    private alertController: AlertController = new AlertController();
    private workoutPatternsService: WorkoutPatternService = inject(WorkoutPatternService);
    private router: Router = inject(Router);

    public constructor() {
        addIcons({ addCircleOutline });
    }

    protected async addPattern(): Promise<void> {
        const nameIsEmpty: boolean = !this.patternName.trim() || this.selectedExerciseNames.length === 0

        if (nameIsEmpty) {
            const alert = await this.alertController.create({
                header: 'Champs manquants',
                message: 'Veuillez renseigner un nom et sélectionner au moins un exercice.',
                buttons: ['Fermer']
            });
            await alert.present();
            return;
        }

        const patterns: WorkoutPattern[] = await this.workoutPatternsService.getWorkoutPatterns();

        if (patterns.some((pattern: WorkoutPattern) => pattern.name === this.patternName)) {
            const alert = await this.alertController.create({
                header: 'Déjà pris',
                message: 'Vous avez déjà une séance qui porte le même nom.',
                buttons: ['Fermer']
            });
            await alert.present();
            return;
        }

        const newPattern: WorkoutPattern = {
            id: 0,
            name: this.patternName,
            exercises: this.allExercises.filter((exercise: Exercise) =>
                this.selectedExerciseNames.includes(exercise.name)
            )
        };
        await this.workoutPatternsService.addWorkoutPattern(newPattern);
        await this.router.navigate(['/home']);
    }
}
