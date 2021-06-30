import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    public token$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public get token(): string {
        return this.token$.getValue();
    }
    private readonly tokenUrl: string = 'user-token';
    private readonly tokenSystemUrl: string = 'system-token';

    constructor() {
    }

    public async saveToken(token: string): Promise<void> {
        await Storage.set({
            key: this.tokenUrl,
            value: token,
        });
        this.token$.next(token);
    }

    public async loadToken(): Promise<string> {
        const res = await Storage.get({key: this.tokenUrl});
        const token = (res.value !== 'null' && res.value !== 'undefined') ? res.value : null;
        this.token$.next(token);
        return token;
    }

    public async deleteToken(): Promise<void> {
        const res = await Storage.set({key: this.tokenUrl, value: 'null'});
        this.token$.next(null);
    }

    public async loadSystemToken(): Promise<boolean> {
        const res = await Storage.get({key: this.tokenSystemUrl});
        console.log('token', res);
        return (!!res.value && res.value !== 'null' && res.value !== 'undefined');
    }

    public async setSystemToken(): Promise<void> {
        await Storage.set({
            key: this.tokenSystemUrl,
            value: 'set',
        });
    }
}
