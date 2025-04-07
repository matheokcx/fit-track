import { WorkoutPattern } from "./workoutPattern";
import { Exercise } from "./exercise";


export enum feelings {
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  MIDDLE = 'MIDDLE',
  BAD = 'BAD'
}

export type finishedExercise = {
  exercise: Exercise,
  maxWeight: number
};

export type Workout = {
  id: number,
  pattern: WorkoutPattern,
  startingHour: string,
  endHour: string,
  finishedExercise: finishedExercise[],
  feeling: "VERY_GOOD" | "GOOD" | "MIDDLE" | "BAD",
  observation: string | null
};

export type Workouts = Workout[];
