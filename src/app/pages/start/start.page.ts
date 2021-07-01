import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {TokenService} from "../../core/services/data/token.service"
import {IStartPageItem} from "./start.model";
import {StartPageInfo} from "./start.mock";

@Component({
    selector: 'app-start-page',
    templateUrl: './start.page.html',
    styleUrls: ['./start.page.scss'],
})
export class StartPage {

    public slideOpts = {
        on: {
            beforeInit() {
                const swiper = this;
                swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
                const overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: true,
                };
                swiper.params = Object.assign(swiper.params, overwriteParams);
                swiper.params = Object.assign(swiper.originalParams, overwriteParams);
            },
            setTranslate() {
                const swiper = this;
                const {slides} = swiper;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = swiper.slides.eq(i);
                    const offset$$1 = $slideEl[0].swiperSlideOffset;
                    let tx = -offset$$1;
                    if (!swiper.params.virtualTranslate) tx -= swiper.translate;
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade
                        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
                        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                    $slideEl
                        .css({
                            opacity: slideOpacity,
                        })
                        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
                }
            },
            setTransition(duration) {
                const swiper = this;
                const {slides, $wrapperEl} = swiper;
                slides.transition(duration);
                if (swiper.params.virtualTranslate && duration !== 0) {
                    let eventTriggered = false;
                    slides.transitionEnd(() => {
                        if (eventTriggered) {
                            return;
                        }

                        if (!swiper || swiper.destroyed) {
                            return;
                        }

                        eventTriggered = true;
                        swiper.animating = false;
                        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                        triggerEvents.forEach(x => $wrapperEl.trigger(x));
                    });
                }
            },
        }
    };

    public startPageInfo: IStartPageItem[] = StartPageInfo;

    constructor(
        private navCtrl: NavController,
        private tokenService: TokenService,
    ) {
    }

    public async start(): Promise<void> {
        await this.tokenService.setSystemToken();
        await this.navCtrl.navigateRoot('tabs');
    }

}
