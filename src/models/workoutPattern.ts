import {Exercise} from './exercise';

export type WorkoutPattern = {
    id: number;
    name: string;
    exercises: Exercise[];
};
