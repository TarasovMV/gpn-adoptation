import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy, OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {IonSlides, ModalController, Platform} from '@ionic/angular';
import {AppConfigService} from 'src/app/core/services/platform/app-config.service';
import {TabsService} from 'src/app/core/services/tabs/tabs.service';
import {IRecommendation} from 'src/app/pages/tabs/tabs.model';
import {BackButtonService} from "../../../../../../core/services/platform/back-button.service";

@Component({
    selector: 'app-tabs-offline-recommendation',
    templateUrl: './tabs-offline-recommendation.component.html',
    styleUrls: ['./tabs-offline-recommendation.component.scss'],
})
export class TabsOfflineRecommendationComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren('bar') bars: QueryList<ElementRef>;
    @Input() story: IRecommendation;
    public index = 0;
    private nextTimer: ReturnType<typeof setTimeout>;

    public readonly restUrl: string;

    constructor(
        public tabsService: TabsService,
        private modalController: ModalController,
        private backButtonService: BackButtonService,
        private platform: Platform,
        appConfig: AppConfigService
    ) {
        this.restUrl = appConfig.getAttribute("restUrl");
    }

    public ngOnInit(): void {
        this.backButtonService.actionOnBack(this.platform, () => this.dismiss(), false);
    }

    public ngAfterViewInit(): void {
        this.progressBar(0);
    }

    public ngOnDestroy(): void {
        this.backButtonService.clearAction();
        clearInterval(this.nextTimer);
    }

    public dismiss(): void {
        this.modalController.dismiss().then();
    }

    public nextStory(): void {
        if (this.index < this.story.history.length - 1) {
            this.index++;
            this.progressBar(this.index);
        } else {
            this.dismiss();
        }
    }

    public previousStory(): void {
        if (this.index > 0) {
            this.index--;
        } else {
            this.index = 0;
        }
        this.progressBar(this.index);
    }

    public progressBar(index: number): void {
        const timeout = 5 * 1000; // time to show story
        if (!!this.nextTimer) clearInterval(this.nextTimer);
        const prev = this.bars.get(index - 1)?.nativeElement;
        const current = this.bars.get(index)?.nativeElement;
        const next = this.bars.get(index + 1)?.nativeElement;
        if (!!prev) {
            prev.style.transition = 'none';
            prev.style.width = 100 + '%';
        }
        if (!!next) {
            next.style.transition = 'none';
            next.style.width = 0;
        }
        current.style.transition = 'none';
        current.style.width = 0;
        setTimeout(() => {
            current.style.transition = `linear ${timeout}ms`;
            current.style.width = 100 + '%';
        });
        this.nextTimer = setTimeout(() => this.nextStory(), timeout);
    }
}
