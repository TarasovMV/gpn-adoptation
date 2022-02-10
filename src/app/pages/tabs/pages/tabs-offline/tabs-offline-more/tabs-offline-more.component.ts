import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {
    IAdaptationStage,
    IAdaptationSubStage,
    IPageTab,
    PageTabType,
    ReferenceBookSectionType
} from "../../../tabs.model";
import {NavController} from "@ionic/angular";
import {ApiReferenceService} from "../../../../../core/services/api/api-reference.service";
import {BehaviorSubject} from "rxjs";
import {MyThemeService} from "../../../../../core/services/platform/my-theme-service.service";

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
    public route: PageTabType = 'offline';

    public type: ReferenceBookSectionType = ReferenceBookSectionType.Default;
    public dictionaries: IDictionary[];
    public data: IAdaptationStage = null;

    public dictViewFav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public nav: Router,
        public tabsService: TabsService,
        private navCtrl: NavController,
        private apiReferenceService: ApiReferenceService,
        public myThemeService: MyThemeService
    ) { }

    public ngOnInit(): void {
        this.tabsService.businessStages$.subscribe(async value => {
            console.log(value);
            this.data = value;
            this.type = this.data.referenceBookSectionType === 0 ? ReferenceBookSectionType.Default : ReferenceBookSectionType.Dictionary;
            if (this.type === ReferenceBookSectionType.Default) {
                this.substages = this.data?.adaptationSubStages;
                console.log(this.data?.adaptationSubStages);
            }
            if (this.type === ReferenceBookSectionType.Dictionary) {
                this.dictionaries = await this.getDictionaries(this.data?.adaptationSubStages);
            }
        });
    }

    public substages = [];

    public backToOffline(): void {
        this.navCtrl.back();
    }

    public async changeFavouriteView(): Promise<void> {
        const isFavourite = !this.dictViewFav$.getValue();
        this.dictViewFav$.next(isFavourite);
        this.dictionaries = await this.getDictionaries(this.data?.adaptationSubStages, isFavourite);
    }

    public openSubStage(subStage: IAdaptationSubStage): void {
        this.tabsService.adaptationComponents$.next(subStage);
        this.navCtrl.navigateForward('info', { queryParams: { id: subStage.id, type: 'reference' } }).then();
    }

    public filterSections(search: string): void {
        search = search.toLowerCase();
        this.getDictionaries(
            this.data.adaptationSubStages.filter(x => x.name?.toLowerCase().search(search) !== -1), this.dictViewFav$.getValue()
        ).then(x => this.dictionaries = x);
    }

    public addToFavorite(stage: IAdaptationSubStage): void {
        stage.isFavourite = !stage.isFavourite;
        if (stage.isFavourite) {
            this.apiReferenceService.addFavouriteTerm(stage.id).then();
        } else {
            this.apiReferenceService.deleteFavouriteTerm(stage.id).then();
        }
    }

    private async getDictionaries(stages: IAdaptationSubStage[], isFavourite = false): Promise<IDictionary[]> {
        stages = stages?.sort((a, b) => a.name > b.name ? 1 : -1);
        const favourites = await this.apiReferenceService.getFavouriteTerms();
        favourites?.forEach(x => {
            const stage = stages.find(s => s.id === x);
            if (!!stage) {
                stage.isFavourite = true;
            }
        });
        if (isFavourite) {
            stages = stages.filter(x => x.isFavourite);
        }
        const dictionaries: IDictionary[] = [];
        stages.forEach(x => {
            const letter = x?.name?.toUpperCase()?.[0];
            const dict = dictionaries.find(d => d.letter === letter);
            if (dict) {
                dict.stages.push(x);
            } else {
                dictionaries.push({
                    letter,
                    stages: [x],
                });
            }
        });
        return dictionaries;
    }
}
