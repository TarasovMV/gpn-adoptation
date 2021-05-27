import { Component, OnInit } from '@angular/core';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IPageTab, IProgress, IStage, PageTabType } from "../../tabs.interfaces";

@Component({
    selector: 'app-tabs-progress',
    templateUrl: './tabs-progress.page.html',
    styleUrls: ['./tabs-progress.page.scss'],
})
export class TabsProgressPage implements OnInit, IPageTab {
    public route: PageTabType = 'progress';

    public data: IProgress[] = [
        {
            id: 7,
            header: 'Вступительный этап',
            subStages: [
                {
                    id: 8,
                    status: 0,
                    header: 'Знакомство с организацией',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: '«Автоматика-сервис» - инженерно-сервисная компания специализирующаяся на проектировании, внедрении и комплексном обслуживании систем промышленной автоматизации всех уровней для предприятий нефтегазовой отрасли. За 16 лет успешной работы наша компания стала безусловным лидером по объему реализации профильных проектов на производственных объектах «Газпром нефти».',
                    adaptationStageId: 7
                },
                {
                    id: 9,
                    status: 1,
                    header: 'О приложении',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: '«Автоматика-сервис» - инженерно-сервисная компания специализирующаяся на проектировании, внедрении и комплексном обслуживании систем промышленной автоматизации всех уровней для предприятий нефтегазовой отрасли. За 16 лет успешной работы наша компания стала безусловным лидером по объему реализации профильных проектов на производственных объектах «Газпром нефти».',
                    adaptationStageId: 7
                },
            ]
        },
        {
            id: 9,
            header: '1 день в организации',
            subStages: [
                {
                    id: 8,
                    status: 1,
                    header: 'Оформление в отделе кадров',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: '«Автоматика-сервис» - инженерно-сервисная компания специализирующаяся на проектировании, внедрении и комплексном обслуживании систем промышленной автоматизации всех уровней для предприятий нефтегазовой отрасли. За 16 лет успешной работы наша компания стала безусловным лидером по объему реализации профильных проектов на производственных объектах «Газпром нефти».',
                    adaptationStageId: 7
                },
                {
                    id: 9,
                    status: 1,
                    header: 'Ознакомление с документами',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: 'Ознакомься с положениями, должностной инструкцией, локальными нормативными актами',
                    adaptationStageId: 7
                },
                {
                    id: 10,
                    status: 0,
                    header: 'Инструктаж по технике безопасности и охране труда',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: 'Ознакомьтесь с техникой безопасности на предприятии',
                    adaptationStageId: 7
                },
            ]
        },
        {
            id: 10,
            header: '2 день в организации',
            subStages: [
                {
                    id: 8,
                    status: 0,
                    header: 'Знакомство с коллегами',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: 'Познакомься с людьми, которые тебя окружают',
                    adaptationStageId: 7
                },
            ]
        },
        {
            id: 11,
            header: '3 день в организации',
            subStages: [
                {
                    id: 8,
                    status: 0,
                    header: 'Ознакомиться с документами',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: '',
                    adaptationStageId: 7
                },
            ]
        },
        {
            id: 12,
            header: 'Первый месяц работы',
            subStages: [
                {
                    id: 8,
                    status: 0,
                    header: 'Адаптация',
                    imagePath: 'Adaptation/strategy.jpg',
                    body: '',
                    adaptationStageId: 7
                },
            ]
        },
    ];
    public doneStages: number = 0;
    public allStagesLength: number = 0;

    constructor(public tabsService: TabsService) {
    }

    ngOnInit(): void {
        this.progressValue();
    }

    public async getData(): Promise<void> {
        this.data = await this.tabsService.getAdaptation();
    }

    public performedInSection(subStages: IStage[]): number {
        let count: number = 0;
        subStages.forEach(value => count += value.status)
        return count;
    }

    public switchStage(item: IProgress): void {
        item.isActive = !item.isActive;
    }

    public progressValue(): void {
        let count: number = 0;
        this.data.forEach(value => {
            value.subStages.forEach(x => {
                count += x.status;
                this.allStagesLength++;
            })
        });        
        this.doneStages = count;
    }
}
