import {Component, OnInit} from '@angular/core';
import {IPageTab, PageTabType} from "../../tabs.interfaces";

export interface IMenuItem {
    name: string,
    logo: string
}

@Component({
    selector: 'app-tabs-news',
    templateUrl: './tabs-news.page.html',
    styleUrls: ['./tabs-news.page.scss'],
})
export class TabsNewsPage implements OnInit, IPageTab {
    public route: PageTabType = 'news';
    public readonly menuItems: IMenuItem[] = [
        {
            name: 'Публикации',
            logo: 'publications'
        },
        {
            name: 'Важные объявления',
            logo: 'important'
        },
        {
            name: 'Сохранённые',
            logo: 'saved'
        }
    ];
    public readonly shareIcon: string = 'assets/icon/news/share.svg';
    public readonly saveIcon: string = 'assets/icon/news/favored.svg'

    constructor() {
    }

    ngOnInit(): void {
    }

}
