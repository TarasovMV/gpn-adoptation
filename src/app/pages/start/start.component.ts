import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {TokenService} from "../../core/services/data/token.service";

export interface IStartPage {
    id: number;
    icon: string;
    image: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-start-page',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

    public slideOpts = {
        initialSlide: 0,
        speed: 400
    };

    public startPageInfo: IStartPage[] = [
        {
            id: 1,
            icon: 'assets/icon/info.svg',
            image: 'assets/icon/info.png',
            title: 'Доступность информации',
            description: `Приложение позволит Вам самостоятельно получить доступ к информации с мобильного устройства,
            ознакомиться с историей организации, руководством, особенностями бизнеса, предоставляемыми работодателем
            возможностями и находить ответы на свои вопросы`
        },
        {
            id: 2,
            icon: 'assets/icon/support.svg',
            image: 'assets/icon/support.png',
            title: 'Адаптация персонала',
            description: `Приложение предоставляет возможность быстрее изучить корпоративные стандарты организации,
            пошагово рассмотреть различные процессы, давать обратную связь по интересующим Вас вопросам и проходить адаптационный трек.
             Это поможет Вам быстрее влиться в работу!`
        },
        {
            id: 3,
            icon: 'assets/icon/monitoring.svg',
            image: 'assets/icon/monitoring.png',
            title: 'Окно мониторинга',
            description: `Администраторы приложения получают канал коммуникации, который
            позволяет быть в курсе потребностей и проблем сотрудников. Дает возможность
            отследить прогресс по адаптации персонала, в режиме реального времени организовать
            опрос для сотрудников и внести изменения в адаптационный трек.`
        }
    ];

    constructor(
        private navCtrl: NavController,
        private tokenService: TokenService,
    ) {
    }

    ngOnInit() {
    }

    public async start(): Promise<void> {
        await this.tokenService.setSystemToken();
        await this.navCtrl.navigateRoot('tabs');
    }

}
