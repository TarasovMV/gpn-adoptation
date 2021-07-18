import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationStage, IAdaptationSubStage, IPageTab, PageTabType } from "../../../tabs.model";
import { NavController } from "@ionic/angular";

interface IDictionary {
    letter: string;
    stages: IAdaptationSubStage[];
}

@Component({
    selector: 'app-tabs-offline-more',
    templateUrl: './tabs-offline-more.component.html',
    styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit, IPageTab {
    @ViewChildren('letter') letters: QueryList<ElementRef>;

    public route: PageTabType = 'offline';
    public data: IAdaptationStage = null;
    public dictionaries: IDictionary[];
    public favorites: IAdaptationSubStage[] = [];

    constructor(
        public nav: Router,
        public tabsService: TabsService,
        private navCtrl: NavController,
    ) { }

    ngOnInit(): void {
        this.tabsService.businessStages$.subscribe(value => {
            this.data = value;
            this.data.adaptationSubStages = this.data?.adaptationSubStages
                ?.sort((a, b) => a.name > b.name ? 1 : -1);
            this.dictionaries = this.getDictionaries(this.data?.adaptationSubStages);
        });
    }

    public backToOffline(): void {
        this.navCtrl.back();
    }

    public openSubStage(subStage: IAdaptationSubStage): void {
        this.tabsService.adaptationComponents$.next(subStage);
        this.navCtrl.navigateForward('info', { queryParams: { id: subStage.id, type: 'reference' } }).then();
    }

    public filterSections(search: string): void {
        search = search.toLowerCase();
        this.dictionaries = this.getDictionaries(this.data.adaptationSubStages.filter(x => x.name?.toLowerCase().search(search) !== -1));
    }

    public addToFavorite(stage: IAdaptationSubStage): void {
        stage.isFavourite = !stage.isFavourite;
        if (stage.isFavourite) {
            this.favorites.push(stage);
        } else {
            const index = this.favorites.find(x => x?.id === stage?.id)?.id;
            this.favorites = this.favorites?.filter(x => x?.id !== index);
        }
    }

    private getDictionaries(stages: IAdaptationSubStage[]): IDictionary[] {
        let dictionaries: IDictionary[] = [];
        stages.forEach(x => {
            const letter = x?.name?.toUpperCase()?.[0];
            const dict = dictionaries.find(d => d.letter === letter);
            if (dict) {
                dict.stages.push(x);
            } else {
                dictionaries.push({
                    letter,
                    stages: [x],
                })
            }
        })
        return dictionaries;
    }
}
