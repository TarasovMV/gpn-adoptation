import {Component, NgZone, OnInit} from '@angular/core';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import {NavController, ToastController} from "@ionic/angular";
import {IAdaptationComponent, IStage} from "../tabs/tabs.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConfigService} from "../../core/services/platform/app-config.service";
import {Browser} from "@capacitor/browser";
import {TabsProgressService} from "../tabs/pages/tabs-progress/services/tabs-progress.service";
import {MyThemeService} from "../../core/services/platform/my-theme-service.service";

export class AdaptationBullet {
    public type: number;
    public digit: number;
    public background: string;
}

@Component({
    selector: 'app-info',
    templateUrl: './info.page.html',
    styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
    public id: number;
    public cardData: IStage;
    public isDone: boolean = false;
    public isProgress: boolean = true;
    private readonly ratesDefault: {id: number; isActive: boolean}[] = [
        {id: 1, isActive: false},
        {id: 2, isActive: false} ,
        {id: 3, isActive: false},
        {id: 4, isActive: false},
        {id: 5, isActive: false}
    ];

    public rates: { [key: number]: {id: number; isActive: boolean}[] } = {};
    public text: { [key: number]: string } = {};
    public checkbox: {[key: number]: string} = {};
    public bullets: {[key: number]: AdaptationBullet} = {};

    public data: IAdaptationComponent[];

    public readonly restUrl: string;

    constructor(
        private route: ActivatedRoute,
        public nav: Router,
        private navCtrl: NavController,
        public tabsService: TabsService,
        private tabsProgressService: TabsProgressService,
        private toastController: ToastController,
        appConfigService: AppConfigService,
        private ngZone: NgZone,
        public myThemeService: MyThemeService
    ) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public async ngOnInit(): Promise<void> {
        if (!localStorage.getItem("checkbox")) {
            localStorage.setItem("checkbox", JSON.stringify(this.checkbox));
        }
        this.id = +this.route.snapshot.queryParamMap.get('id');
        this.isProgress = this.route.snapshot.queryParamMap.get('type') === 'progress';
        this.tabsService.adaptationComponents$.subscribe(value => {
            this.data = value?.adaptationComponents;
            this.data?.filter(x => x.componentType === 7)?.forEach(x => { this.rates[x.id] = [...this.ratesDefault.map(r => ({...r}))] });
            this.isDone = value.isDone;
            this.data.forEach(x => {
                if (x.componentType === 7 && !!x.result?.rating) {
                    this.rateIt({id: x.result.rating, isActive: true}, x.id);
                    console.log(x);
                }
                if (x.componentType === 14 && !!x.result?.comment) {
                    this.text[x.id] = x.result.comment;
                }
                if (x.componentType === 16) {
                    this.bullets[x.id] = JSON.parse(x.footer);
                }
                if (x.componentType === 15) {
                    console.log(x);
                    this.checkbox[x.id] = x.result.comment;

                    const savedValue = JSON.parse(localStorage.getItem("checkbox"))[x.id];
                    console.log(savedValue);

                        if (!x.result.comment) {
                            if (!savedValue) {
                            if (x.header === 'checked') {
                                console.log(1);
                                this.checkbox[x.id] = 'checked';
                                x.isActive = true;
                            }
                            else {
                                console.log(2);
                                this.checkbox[x.id] = 'unchecked';
                                x.isActive = false;
                            }
                            }
                            else {
                                this.checkbox[x.id] = savedValue;
                                if (savedValue === "checked") {
                                    x.isActive = true;
                                }
                                else {
                                    x.isActive = false;
                                }
                            }
                        } else {
                            if (x.result.comment === 'checked') {
                                this.checkbox[x.id] = 'checked';
                                x.isActive = true;
                                console.log(3);
                            } else {
                                this.checkbox[x.id] = 'unchecked';
                                x.isActive = false;
                                console.log(4);
                            }
                        }
                    }
                console.log(x);
            });
        });
    }

    public back(): void {
        this.navCtrl.back();
    }

    public openFile(path: string): void {
        window.open(`${this.restUrl}/${path}`);
    }

    public openMore(item: IAdaptationComponent): void {
        item.isActive = !item.isActive;
    }

    public clickButton(item: IAdaptationComponent): void {
        Browser.open({url: item.body}).then();
    }

    public async setDone(): Promise<void> {
        if (!this.validateComponentsResults()) {
            const toast = await this.toastController.create({
                message: 'Пройдите пульс опрос, чтобы открыть новый этап!',
                duration: 2000,
                cssClass: 'custom-toast',
            });
            await toast.present();
            return;
        }
        this.saveComponentsResult().then();
        this.tabsProgressService.setDoneId(this.id);
        this.isDone = true;
        setTimeout(() => {
            this.navCtrl.back();
        }, 300);
    }

    public rateIt(rate: {id: number; isActive: boolean}, id: number): void {
        this.rates[id].forEach(x => x.isActive = false);
        this.rates[id].forEach(value => {
            if (value.id <= rate.id) {
                value.isActive = true;
            }
        });
    }

    public isChecked(id: number, item?: IAdaptationComponent): void {
        this.ngZone.run(()=> {
            if (this.checkbox[id] === 'checked') {
                this.checkbox[id] = 'unchecked';
                item.isActive = false;
            }
            else if (!this.checkbox[id]) {
                this.checkbox[id] = 'unchecked';
                item.isActive = false;
            }
            else {
                this.checkbox[id] = 'checked';
                item.isActive = true;
            }
            console.log(this.checkbox[id]);
            localStorage.setItem("checkbox", JSON.stringify(this.checkbox));
        });
    }

    private validateComponentsResults(): boolean {
        if (!Object.keys(this.rates).length) {
            return true;
        }
        for (const id of Object.keys(this.rates)) {
            const rating = [...this.rates[+id]].reverse().find(x => x.isActive)?.id;
            if (rating) {
                return true;
            }
        }
        return false;
    }

    public getBulletType(item: IAdaptationComponent): number {
        return this.bullets[item.id].type;
    }

    public getBulletDigit(item: IAdaptationComponent): number {
        return this.bullets[item.id].digit;
    }

    public getBulletBackground(item: IAdaptationComponent): string{
        return this.bullets[item.id].background;
    }

    private async saveComponentsResult(): Promise<void> {
        const saveResult = async (id, result): Promise<void> => {
            await this.tabsProgressService.saveComponentResult(id, result);
            console.log('obj', this.data.find(x => x.id === +id));
            this.data.find(x => x.id === +id).result = result;
        };

        // save rates
        for (const id of Object.keys(this.rates)) {
            const result = {
                rating: [...this.rates[+id]].reverse().find(x => x.isActive)?.id,
                comment: null,
            };
            await saveResult(+id, result);
        }

        // save comments
        for (const id of Object.keys(this.text)) {
            const result = {rating: null, comment: this.text[+id]};
            await saveResult(+id, result);
        }

        // save checkbox
        for (const id of Object.keys(this.checkbox)) {
            const result = {rating: null, comment: this.checkbox[id]};
            console.log(result);
            await saveResult(+id, result);
        }
    }

    getBlitzIcon(item: IAdaptationComponent) {
        if (item.body === "stars") {
            return "assets/icon/progress/star.svg";
        }
        else if (item.body === "rockets") {
            return "assets/icon/progress/rocket.svg";
        }
        return "assets/icon/progress/heart.svg";
    }

    getBlitzBackgroundColor(rate, item) {
        if (!rate.isActive) {
            return "#E8ECEF";
        }
        console.log("Define bg color");
        if (item.body === "stars") {
            return "#f2994a";
        }
        else if (item.body === "rockets") {
            return "#0BA4A4";
        }
        return "#FF2E58";
    }

    getFileIcon(item: IAdaptationComponent) {
        const ext = item.filePath.split('.').pop();
        if (ext === "pdf") {
            return "assets/icon/progress/pdf.svg";
        }
        return "assets/icon/progress/word.svg";
    }

    getBulletIcon(item: IAdaptationComponent) {
        console.log(`${this.restUrl}/${item.imagePath}`);
        return `${this.restUrl}/${item.imagePath}`;
    }
}
