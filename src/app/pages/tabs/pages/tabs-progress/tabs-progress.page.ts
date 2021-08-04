import {Component, OnDestroy, OnInit} from '@angular/core';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationStage, IAdaptationSubStage, IPageTab, IProgress, PageTabType } from '../../tabs.model';
import { TabsProgressService } from "./services/tabs-progress.service";
import { UserService } from "../../../../core/services/data/user.service";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { ApiAdaptationService } from "../../../../core/services/api/api-adaptation.service";
import { trigger, style, animate, transition } from '@angular/animations';
import { BackButtonService } from "../../../../core/services/platform/back-button.service";
import { InfoPopupComponent } from 'src/app/shared/components/info-popup/info-popup.component';
import { Storage } from '@capacitor/storage';


@Component({
    selector: 'app-tabs-progress',
    templateUrl: './tabs-progress.page.html',
    styleUrls: ['./tabs-progress.page.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ height: 0, opacity: 0 }),
                        animate('.3s ease-out',
                            style({ height: '*', opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ height: '*', opacity: 1 }),
                        animate('.3s ease-in',
                            style({ height: 0, opacity: .3 }))
                    ]
                )
            ]
        )
    ]
})
export class TabsProgressPage implements OnInit, OnDestroy, IPageTab {
    public route: PageTabType = 'progress';

    public data: IProgress = null;
    public doneStages = 0;
    public allStagesLength: number;
    public percentProgress = 0;

    constructor(
        public tabsService: TabsService,
        private apiAdaptationService: ApiAdaptationService,
        private tabsProgressService: TabsProgressService,
        private navCtr: NavController,
        private userService: UserService,
        private backButtonService: BackButtonService,
        private platform: Platform,
        private modalController: ModalController
    ) {}

    ngOnInit(): void {
        this.tabsProgressService?.adaptationDone$.subscribe(x => {
            this.doneHandler(x, this.data);
            this.countProgress();
        });
        setTimeout(() => {
            this.showPrompt();
        }, 1500);
        this.getData();
    }

    ngOnDestroy(): void {}

    public ionViewDidEnter(): void {
        this.backButtonService.disableBackOnRoot(this.platform);
    }

    public ionViewWillLeave(): void {
        this.backButtonService.clearOnRoot();
    }

    public async showPrompt(): Promise<void> {
        const isShow: boolean = !!(await Storage.get({key: 'tabs-progress-show'})).value;
        if (isShow) {
            return;
        }
        const modal = await this.modalController.create({
            component: InfoPopupComponent,
        });
        Storage.set({key: 'tabs-progress-show', value: 'true'}).then();
        return await modal.present();
    }

    public async getData(): Promise<void> {
        try {
            //  TODO: add caching for user
            // if (!this.tabsProgressService.adaptationDone$.getValue()?.length) {
            //     await this.tabsProgressService.loadDone();
            // }
            this.data = await this.apiAdaptationService.getAdaptation();
            this.allStagesLength = this.data?.adaptationStages.flatMap(x => x.adaptationSubStages).length;
            this.data?.adaptationStages.flatMap(x => x.adaptationSubStages).forEach(x =>
                x.adaptationComponents = x.adaptationComponents.sort((a, b) => a.order - b.order)
            );
            this.data?.adaptationStages.forEach(x => x.adaptationSubStages = x.adaptationSubStages.sort((a, b) => a.order - b.order));
            // const doneArr = this.tabsProgressService.adaptationDone$.getValue();
            const doneArr = this.data?.adaptationStages
                ?.flatMap(x => x.adaptationSubStages)
                ?.filter(x => x.isDone)
                ?.map(x => x.id);
            this.doneHandler(doneArr, this.data);
            this.openInitStage(this.data.adaptationStages);
            this.tabsProgressService.adaptationDone$.next(doneArr);
        } catch (error) {
            console.error(error);
        } finally {
            this.countProgress();
        }
    }

    public switchStage(item: IAdaptationStage): void {
        item.isActive = !item.isActive;
    }

    public countProgress(): void {
        if (!this.data) {
            return;
        }
        const doneCount = this.data?.adaptationStages
            .flatMap(x => x.adaptationSubStages)
            .filter(x => x.isDone)
            .length;

        this.data?.adaptationStages.forEach(x => x.doneCount = x.adaptationSubStages.filter(s => s.isDone).length)
        this.doneStages = doneCount;
        this.percentProgress = doneCount / this.allStagesLength;
    }

    public toProgressCard(element: IAdaptationSubStage): void {
        this.navCtr.navigateForward('info', { queryParams: { id: element.id, type: 'progress' } });
        this.tabsService.adaptationComponents$.next(element);
    }

    public async doRefresh(event): Promise<void> {
        await this.getData();
        setTimeout(() => {
            event.srcElement.complete();
        }, 300);
    }

    private openInitStage(stages: IAdaptationStage[]): void {
        let activeStage: IAdaptationStage = null;
        for (const stage of [...stages].reverse()) {
            if (stage.adaptationSubStages.some(x => x.isDone)) {
                activeStage = stage;
                break;
            }
        }
        activeStage = !!activeStage ? activeStage : stages[0];
        activeStage.isActive = true;
        setTimeout(() => {
            const el = document.getElementById(`stage_${activeStage.id}`);
            el?.scrollIntoView({block: 'start', behavior: 'smooth'});
        }, 100);
    }

    private doneHandler(doneArr: number[], data: IProgress): void {
        if (!data) {
            return;
        }
        const stagesArr = data?.adaptationStages.flatMap(x => x.adaptationSubStages);
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
        });
    }
}
