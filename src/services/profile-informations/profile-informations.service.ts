import {inject, Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {BehaviorSubject} from 'rxjs';

type ProfileField = 'weight' | 'height' | 'age' | 'weight_goal' | 'water_consomation';

@Injectable({
    providedIn: 'root'
})
export class ProfileInformationsService {
    private profileChanged$ = new BehaviorSubject<void>(undefined);
    private storageService: StorageService = inject(StorageService);

    public async getWeight(): Promise<number | null> {
        return this.getProfileField('weight');
    }

    public async getHeight(): Promise<number | null> {
        return this.getProfileField('height');
    }

    public async getAge(): Promise<number | null> {
        return this.getProfileField('age');
    }

    public async getWeightGoal(): Promise<number | null> {
        return this.getProfileField('weight_goal');
    }

    public async getWaterConsomation(): Promise<number> {
        return (await this.getProfileField('water_consomation')) ?? 0;
    }

    public async setWeight(newWeight: number): Promise<void> {
        await this.setProfileField('weight', newWeight);
        this.profileChanged$.next();
    }

    public async setHeight(newHeight: number): Promise<void> {
        await this.setProfileField('height', newHeight);
        this.profileChanged$.next();
    }

    public async setWeightGoal(newGoal: number): Promise<void> {
        await this.setProfileField('weight_goal', newGoal);
        this.profileChanged$.next();
    }

    public async setAge(newAge: number): Promise<void> {
        await this.setProfileField('age', newAge);
        this.profileChanged$.next();
    }

    public async setWaterConsomation(newWaterConso: number): Promise<void> {
        await this.setProfileField('water_consomation', newWaterConso);
        this.profileChanged$.next();
    }

    public async resetProfile(): Promise<void> {
        await this.storageService.run('DELETE FROM profile WHERE id = 1');
        this.profileChanged$.next();
    }

    public onProfileChange = () => this.profileChanged$.asObservable();

    private async getProfileField(field: ProfileField): Promise<number | null> {
        const rows = await this.storageService.query<Record<string, number | null>>(
            `SELECT ${field} FROM profile WHERE id = 1`
        );

        if (rows.length === 0 || !rows[0][field]) {
            return null;
        }

        return rows[0][field];
    }

    private async setProfileField(field: ProfileField, value: number): Promise<void> {
        await this.storageService.run(
            `INSERT INTO profile (id, ${field}) VALUES (1, ?)
             ON CONFLICT(id) DO UPDATE SET ${field} = ?`,
            [value, value]
        );
    }
}
