import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TabsService } from "src/app/core/services/tabs/tabs.service";
import { IProgress } from "../../../tabs.interfaces";

@Injectable()
export class ProgressService {
    public progressData: IProgress[];
    constructor(private tabsService: TabsService) {}

    public async getProgressData(): Promise<void> {
        const data = await this.tabsService.getAdaptation();
        this.progressData = data;
    }
}