import { Exercises } from "./exercise";

// ==============================================


export type WorkoutPattern = {
  id: number,
  name: string,
  exercises: Exercises
};

export type WorkoutPatterns = WorkoutPattern[];
