import {Exercises} from "./exercise";
import {Pattern} from "./pattern";

export enum feelings {
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  MIDDLE = 'MIDDLE',
  BAD = 'BAD'
}

export type Workout = {
  id: number,
  pattern: Pattern,
  startHour: string,
  endHour: string,
  feeling: "VERY_GOOD" | "GOOD" | "MIDDLE" | "BAD",
};

export type Workouts = Workout[];
