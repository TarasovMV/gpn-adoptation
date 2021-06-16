import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class TabsProgressService {
    public adaptationDone$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor() {
        this.loadDone().then();
    }

    public setDoneId(id: number): void {
        let cur = this.adaptationDone$.getValue()
        cur = [...new Set([...cur, id])];
        this.adaptationDone$.next(cur);
        this.saveDone(cur);
    }

    private async loadDone(): Promise<void> {
        const load = await Storage.get({key: 'done'});
        const doneArr = !!load?.value ? JSON.parse(load.value) : []
        this.adaptationDone$.next(doneArr);
    }

    public saveDone(doneArr: number[]): void {
        Storage.set({
            key: 'done',
            value: JSON.stringify(doneArr),
        })
    }
}
