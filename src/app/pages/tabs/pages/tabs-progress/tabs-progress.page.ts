import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationStages, IAdaptationSubStages, IPageTab, IProgress, PageTabType } from '../../tabs.interfaces';
import { ProgressCardComponent } from './progress-card/progress-card.component';



@Component({
    selector: 'app-tabs-progress',
    templateUrl: './tabs-progress.page.html',
    styleUrls: ['./tabs-progress.page.scss'],
})
export class TabsProgressPage implements OnInit, IPageTab {
    public route: PageTabType = 'progress';
    public data: IProgress = null;
    public doneStages = 0;
    public allStagesLength = 0;
    public percentProgress = 0;

    public progressCard = ProgressCardComponent;
    constructor(
        public tabsService: TabsService,
        public router: Router
        ) {
    }

    ngOnInit(): void {
        this.getData(1);
    }

    public async getData(id: number): Promise<void> {
        try {
            this.data = await this.tabsService.getAdaptation(id);
            this.allStagesLength = this.data.adaptationStages.flatMap(x => x.adaptationSubStages).length;

            console.log(this.data);
        }
        catch(error) {
            console.error(error);
        }
        finally {
            this.progressValue();
        }
    }

    // public performedInSection(subStages: IAdaptationStages[]): number {
    //     let count = 0;
    //     return count;
    // }

    public switchStage(item: IAdaptationStages): void {
        item.isActive = !item.isActive;
    }

    public progressValue(): void {
        // let count = 0;
        // this.data.forEach(value => {
        //     value.subStages.forEach(x => {
        //         count += x.status;
        //         this.allStagesLength++;
        //     });
        // });
        // this.doneStages = count;
        // this.percentProgress = count / this.allStagesLength;
    }

    public toProgressCard(element: IAdaptationSubStages): void {
        this.router.navigate(['tabs/tabs-progress/' + element.id]);
        this.tabsService.adaptationComponents$.next(element.adaptationComponents);
        console.log(element.adaptationComponents);
    }
}
