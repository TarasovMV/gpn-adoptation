import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import { Storage } from '@capacitor/storage';
import {ApiAdaptationService} from "../../../../../core/services/api/api-adaptation.service";

@Injectable({
    providedIn: 'root'
})
export class TabsProgressService {
    public adaptationDone$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor(private apiAdaptationService: ApiAdaptationService) {}

    public setDoneId(id: number): void {
        let cur = this.adaptationDone$.getValue()
        cur = [...new Set([...cur, id])];
        this.adaptationDone$.next(cur);
        this.saveDone(cur);
        this.apiAdaptationService.setAdaptationResult(id);
    }

    public async loadDone(): Promise<void> {
        const load = await Storage.get({key: 'done'});
        const doneArr = !!load?.value ? JSON.parse(load.value) : [];
        this.adaptationDone$.next(doneArr);
        doneArr.forEach(id => {
            this.apiAdaptationService.setAdaptationResult(id);
        })
    }

    public async saveDone(doneArr: number[]): Promise<void> {
        await Storage.set({
            key: 'done',
            value: JSON.stringify(doneArr),
        })
    }
}
