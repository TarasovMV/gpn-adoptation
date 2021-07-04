import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IAdaptationComponent, IStage} from '../../../tabs.model';
import {Browser} from "@capacitor/browser";
import {TabsProgressService} from "../services/tabs-progress.service";
import {NavController} from "@ionic/angular";
import {AppConfigService} from "../../../../../core/services/platform/app-config.service";
import {ProgressCardAccentTextComponent} from '../components/progress-card-accent-text/progress-card-accent-text.component';
import {ProgressCardAttentionComponent} from '../components/progress-card-attention/progress-card-attention.component';
import {ProgressCardBlitzComponent} from '../components/progress-card-blitz/progress-card-blitz.component';
import {ProgressCardBlockComponent} from '../components/progress-card-block/progress-card-block.component';
import {ProgressCardButtonComponent} from '../components/progress-card-button/progress-card-button.component';
import {ProgressCardFileComponent} from '../components/progress-card-file/progress-card-file.component';
import {ProgressCardImageSquadComponent} from '../components/progress-card-image-squad/progress-card-image-squad.component';
import {ProgressCardImageComponent} from '../components/progress-card-image/progress-card-image.component';
import {ProgressCardManualInputComponent} from '../components/progress-card-manual-input/progress-card-manual-input.component';
import {ProgressCardMoreComponent} from '../components/progress-card-more/progress-card-more.component';
import {ProgressCardPointsComponent} from '../components/progress-card-points/progress-card-points.component';
import {ProgressCardTerminComponent} from '../components/progress-card-termin/progress-card-termin.component';
import {ProgressCardUsualTextComponent} from '../components/progress-card-usual-text/progress-card-usual-text.component';
import {ProgressCardVideoComponent} from '../components/progress-card-video/progress-card-video.component';

export enum AdaptationComponentsType {
    none, imageWithText, textWithText, headerWithText,
    term, note, textBlock, blitz, file, moreDetails,
    points, video, buttons, squareImage
}

@Component({
    selector: 'app-progress-card',
    templateUrl: './progress-card.component.html',
    styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
    public readonly components = [
        ProgressCardImageComponent,
        ProgressCardUsualTextComponent,
        ProgressCardAccentTextComponent,
        ProgressCardTerminComponent,
        ProgressCardAttentionComponent,
        ProgressCardBlockComponent,
        ProgressCardBlitzComponent,
        ProgressCardFileComponent,
        ProgressCardMoreComponent,
        ProgressCardPointsComponent,
        ProgressCardVideoComponent,
        ProgressCardButtonComponent,
        ProgressCardImageSquadComponent,
        ProgressCardManualInputComponent
    ];
    public id: number;
    public cardData: IStage;
    public isDone: boolean = false;
    public isProgress: boolean = true;
    public rates: { [key: number]: { id: number; isActive: boolean }[] } = {};
    public text: { [key: number]: string } = {};
    public data: IAdaptationComponent[];
    public readonly restUrl: string;
    private readonly ratesDefault: { id: number; isActive: boolean }[] = [
        {id: 1, isActive: false},
        {id: 2, isActive: false},
        {id: 3, isActive: false},
        {id: 4, isActive: false},
        {id: 5, isActive: false}
    ];

    constructor(
        private route: ActivatedRoute,
        public nav: Router,
        private navCtrl: NavController,
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
        appConfigService: AppConfigService,
        public injector: Injector,
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    createInjector(item: IAdaptationComponent) {
        return Injector.create({
            providers: [
                {provide: 'item', useValue: item}
            ],
            parent: this.injector
        });
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.queryParamMap.get('id');
        this.isProgress = this.route.snapshot.queryParamMap.get('type') === 'progress';
        this.tabsService.showMenu$.next(null);
        this.tabsService.adaptationComponents$.subscribe(value => {
            this.data = value?.adaptationComponents;
            this.data.forEach(x => {
                this.rates[x.id] = [...this.ratesDefault.map(r => ({...r}))]
            });
            this.isDone = value.isDone;
        });
    }

    public backToProgress(): void {
        this.navCtrl.back();
        this.tabsService.showMenu$.next('on');
    }

    public openFile(path: string): void {
        Browser.open({url: `${this.restUrl}/${path}`});
    }

    public openMore(item: IAdaptationComponent): void {
        item.isActive = !item.isActive;
    }

    public clickButton(item: IAdaptationComponent): void {
        console.log(item.body);
        Browser.open({url: item.body});
    }

    public setDone(): void {
        this.tabsProgressService.setDoneId(this.id);
        this.isDone = true;
        setTimeout(() => {
            this.navCtrl.back();
            this.tabsService.showMenu$.next('on');
        }, 300);
    }

    public rateIt(rate: { id: number; isActive: boolean }, id: number): void {
        this.rates[id].forEach(x => x.isActive = false);
        this.rates[id].forEach(value => {
            if (value.id <= rate.id) {
                value.isActive = true;
            }
        });
    }

    public sendIt(id: number): void {
        this.text[id] = '';
    }
}
