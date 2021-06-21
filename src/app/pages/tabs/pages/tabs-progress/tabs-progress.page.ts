import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationStages, IAdaptationSubStage, IPageTab, IProgress, PageTabType } from '../../tabs.interfaces';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import {TabsProgressService} from "./services/tabs-progress.service";
import {UserService} from "../../../../core/services/data/user.service";


@Component({
    selector: 'app-tabs-progress',
    templateUrl: './tabs-progress.page.html',
    styleUrls: ['./tabs-progress.page.scss'],
})
export class TabsProgressPage implements OnInit, IPageTab {
    public route: PageTabType = 'progress';

    public data: IProgress = null;
    public doneStages = 0;
    public allStagesLength: number;
    public percentProgress = 0;

    public progressCard = ProgressCardComponent;
    constructor(
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.tabsProgressService.adaptationDone$.subscribe(x => {
            this.doneHandler(x, this.data);
            this.countProgress();
        });
        this.getData(1);
    }

    public async getData(id: number): Promise<void> {
        try {
            this.data = await this.tabsService.getAdaptation(id);
            this.allStagesLength = this.data.adaptationStages.flatMap(x => x.adaptationSubStages).length;
            this.data.adaptationStages.flatMap(x => x.adaptationSubStages).forEach(x =>
                x.adaptationComponents = x.adaptationComponents.sort((a, b) => a.order - b.order)
            );
            this.data.adaptationStages.forEach(x => x.adaptationSubStages = x.adaptationSubStages.sort((a, b) => a.order - b.order));
            this.data.adaptationStages[0].isActive = true;
            const doneArr = this.tabsProgressService.adaptationDone$.getValue();
            this.doneHandler(doneArr, this.data);
            console.log(this.data);
        }
        catch(error) {
            console.error(error);
        }
        finally {
            this.countProgress();
        }
    }

    public switchStage(item: IAdaptationStages): void {
        item.isActive = !item.isActive;
    }

    public logout(): void {
        this.userService.logout().then();
    }

    public countProgress(): void {
        if  (!this.data) {
            return;
        }
        const doneCount = this.data.adaptationStages
            .flatMap(x => x.adaptationSubStages)
            .filter(x => x.isDone)
            .length;

        this.data.adaptationStages.forEach(x => x.doneCount = x.adaptationSubStages.filter(s => s.isDone).length)
        this.doneStages = doneCount;
        this.percentProgress = doneCount / this.allStagesLength;
    }

    public toProgressCard(element: IAdaptationSubStage): void {
        this.router.navigate(['tabs/tabs-progress/' + element.id]);
        this.tabsService.adaptationComponents$.next(element);
    }

    public async doRefresh(event): Promise<void> {
        await this.getData(1);
        setTimeout(() => {
            event.srcElement.complete();
        }, 300);
    }

    private doneHandler(doneArr: number[], data: IProgress): void {
        if (!data) {
            return;
        }
        const stagesArr = data.adaptationStages.flatMap(x => x.adaptationSubStages);
        for (const stage of [...stagesArr].reverse()) {
            if (doneArr.find(x => x === stage.id)) {
                const idx = stagesArr.findIndex(s => s.id === stage.id);
                if (!!stagesArr[idx + 1]) {
                    stagesArr[idx + 1].disabled = false;
                }
                break;
            }
            stage.disabled = true;
        }
        stagesArr[0].disabled = false;
        doneArr.forEach(x => {
            const stage = stagesArr.find(s => s.id === x);
            if (!!stage) {
                stage.isDone = true;
            }
        })
    }
}
