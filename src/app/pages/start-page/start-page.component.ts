import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export interface IStartPage {
  id: number;
  icon:  string;
  image: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {

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
      description: `Получите доступ к информации об основных
      бизнес-процессах,процедурах и локальных нормативных актах с Вашего мобильного устройства.
      Ознакомьтесь с историей организации, особенностями бизнеса, географией и предоставляемыми Вашим работодателям возможностями.`
    },
    {
      id: 2,
      icon: 'assets/icon/support.svg',
      image: 'assets/icon/support.png',
      title: 'Поддержка 24/7',
      description: `У Вас есть возможность обратиться с любыми возникшими вопросами к
      специалистам управления персоналом, Вашему наставнику или руководителю в режиме удаленного
      доступа вне зависимости от региона, где вы работаете стационарно или находитесь в командировке.`
    },
    {
      id: 3,
      icon: 'assets/icon/monitoring.svg',
      image: 'assets/icon/monitoring.png',
      title: 'Окно мониторинга',
      description: `Руководители и их подчиненные получают канал коммуникации, который
      позволяет быть в курсе новостей организации, текущих изменений, потребностей и проблем работников.
      Реализован механизм эскалации и отслеживания реакции на запросы работника, предпринимаемые шаги с возможностью их сопровождения.`
    }
  ];
  public dots: number[] = new Array(3);
  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  public start() {
    this.navCtrl.navigateRoot('tabs');
  }

}
