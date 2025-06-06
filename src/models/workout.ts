import { WorkoutPattern } from "./workoutPattern";
import { Exercise } from "./exercise";

// ==============================================


export enum feelings {
  GOOD = 'GOOD',
  MIDDLE = 'MIDDLE',
  BAD = 'BAD'
}

export type FinishedExercise = {
  exercise: Exercise,
  maxWeight: number | null
};

export type Workout = {
  id: number,
  pattern: WorkoutPattern,
  startingHour: string | null,
  endHour: string | null,
  finishedExercise: FinishedExercise[],
  feeling: "VERY_GOOD" | "GOOD" | "MIDDLE" | "BAD" | null,
  observation: string | null
};

export type Workouts = Workout[];
