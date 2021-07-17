import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IAdaptationStage, IAdaptationSubStage, IPageTab, PageTabType } from "../../../tabs.model";
import { NavController } from "@ionic/angular";

@Component({
    selector: 'app-tabs-offline-more',
    templateUrl: './tabs-offline-more.component.html',
    styleUrls: ['./tabs-offline-more.component.scss'],
})
export class TabsOfflineMoreComponent implements OnInit, IPageTab, AfterViewInit {
    @ViewChildren('letter') letters: QueryList<ElementRef>;

    public route: PageTabType = 'offline';
    public data: IAdaptationStage = null;
    public sections: IAdaptationSubStage[] = [];
    public favorites: IAdaptationSubStage[] = [];
    public obj = {};

    constructor(
        public nav: Router,
        public tabsService: TabsService,
        private navCtrl: NavController,
    ) { }

    ngOnInit(): void {
        this.tabsService.businessStages$.subscribe(value => {
            this.data = value;
            this.data?.adaptationSubStages?.sort((a, b) => a.name > b.name ? 1 : -1);
        });
        this.sections = this.data?.adaptationSubStages.sort((a, b) => a.name > b.name ? 1 : -1);
    }

    public ngAfterViewInit(): void {
        this.letters?.forEach(x => {
            if (typeof this.obj[x.nativeElement.textContent] !== 'undefined') {
                x.nativeElement.remove();
            }
            else {
                this.obj[x.nativeElement.textContent] = true;
            }
        });
    }

    public backToOffline(): void {
        // this.navCtrl.navigateRoot(['tabs/tabs-offline/']);
        this.navCtrl.back();
    }

    public openSubStage(subStage: IAdaptationSubStage): void {
        this.tabsService.adaptationComponents$.next(subStage);
        this.navCtrl.navigateForward('info', { queryParams: { id: subStage.id, type: 'reference' } });
    }

    public filterSections(search: string): void {
        search = search.toLowerCase();
        this.sections = this.data.adaptationSubStages.filter(x => x.name?.toLowerCase().search(search) !== -1);
    }

    public addToFavorite(stage: IAdaptationSubStage): void {
        stage.favorite = !stage.favorite;
        if (stage.favorite) {
            this.favorites.push(stage);
        } else {
            const index = this.favorites.find(x => x?.id === stage?.id)?.id;
            this.favorites = this.favorites?.filter(x => x?.id !== index);
        }
    }
}
