import {Injectable} from '@angular/core';
import {CapacitorSQLite} from '@capacitor-community/sqlite';
import {Capacitor} from '@capacitor/core';
import {EXERCISES} from '../../models/exercise';

const DB_NAME = 'fitTrackDatabase';

export type SqlStatement = {statement: string; values: unknown[]};

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readyPromise: Promise<void>;

    public constructor() {
        this.readyPromise = this.init();
    }

    private async init(): Promise<void> {
        if (Capacitor.getPlatform() === 'web') {
            await CapacitorSQLite.initWebStore();
        }

        try {
            await CapacitorSQLite.createConnection({
                database: DB_NAME,
                version: 1,
                encrypted: false,
                mode: 'no-encryption',
            });
        } catch {
            // Connection already exists, reuse it
        }

        try {
            await CapacitorSQLite.open({database: DB_NAME});
        } catch {
            // Database already open
        }

        await this.createTables();
        await this.seedExercises();
    }

    private async createTables(): Promise<void> {
        const statements = `
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                description TEXT NOT NULL,
                energy INTEGER NOT NULL,
                break_time INTEGER NOT NULL,
                image TEXT
            );

            CREATE TABLE IF NOT EXISTS exercise_muscle (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exercise_id INTEGER NOT NULL,
                muscle TEXT NOT NULL,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                weight REAL,
                height REAL,
                age REAL,
                weight_goal REAL,
                water_consomation REAL DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS workout_pattern (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS workout_pattern_exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern_id INTEGER NOT NULL,
                exercise_id INTEGER NOT NULL,
                position INTEGER NOT NULL,
                FOREIGN KEY (pattern_id) REFERENCES workout_pattern(id) ON DELETE CASCADE,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id)
            );

            CREATE TABLE IF NOT EXISTS workout (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern_id INTEGER NOT NULL,
                starting_hour TEXT,
                end_hour TEXT,
                feeling TEXT CHECK (feeling IN ('VERY_GOOD', 'GOOD', 'MIDDLE', 'BAD')),
                observation TEXT,
                FOREIGN KEY (pattern_id) REFERENCES workout_pattern(id)
            );

            CREATE TABLE IF NOT EXISTS finished_exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_id INTEGER NOT NULL,
                exercise_id INTEGER NOT NULL,
                max_weight REAL,
                FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id)
            );
        `;

        await CapacitorSQLite.execute({
            database: DB_NAME,
            statements,
            transaction: false,
        });
    }

    private async seedExercises(): Promise<void> {
        const set: SqlStatement[] = [];

        for (const exercise of EXERCISES) {
            set.push({
                statement: 'INSERT OR IGNORE INTO exercise (name, description, energy, break_time, image) VALUES (?, ?, ?, ?, ?)',
                values: [exercise.name, exercise.description, exercise.energy, exercise.breakTime, exercise.image],
            });
        }

        await CapacitorSQLite.executeSet({
            database: DB_NAME,
            set,
            transaction: true,
        });

        const muscleSet: SqlStatement[] = [];

        for (const exercise of EXERCISES) {
            for (const muscle of exercise.usedMuscles) {
                muscleSet.push({
                    statement: 'INSERT OR IGNORE INTO exercise_muscle (exercise_id, muscle) VALUES ((SELECT id FROM exercise WHERE name = ?), ?)',
                    values: [exercise.name, muscle],
                });
            }
        }

        if (muscleSet.length > 0) {
            await CapacitorSQLite.executeSet({
                database: DB_NAME,
                set: muscleSet,
                transaction: true,
            });
        }
    }

    public async ensureReady(): Promise<void> {
        await this.readyPromise;
    }

    public async run(statement: string, values: unknown[] = []): Promise<number> {
        await this.ensureReady();
        const result = await CapacitorSQLite.run({
            database: DB_NAME,
            statement,
            values,
        });
        return result.changes?.lastId ?? 0;
    }

    public async execute(statements: string): Promise<void> {
        await this.ensureReady();
        await CapacitorSQLite.execute({
            database: DB_NAME,
            statements,
            transaction: false,
        });
    }

    public async query<T = unknown>(statement: string, values: unknown[] = []): Promise<T[]> {
        await this.ensureReady();
        const result = await CapacitorSQLite.query({
            database: DB_NAME,
            statement,
            values,
        });
        const rows = (result.values as T[]) ?? [];
        // On iOS, the first element can be column metadata — filter it out
        if (rows.length > 0 && Capacitor.getPlatform() === 'ios' && 'ios_columns' in (rows[0] as object)) {
            return rows.slice(1);
        }
        return rows;
    }

    public async executeSet(set: SqlStatement[]): Promise<void> {
        await this.ensureReady();
        if (set.length === 0) return;
        await CapacitorSQLite.executeSet({
            database: DB_NAME,
            set,
            transaction: true,
        });
    }
}
