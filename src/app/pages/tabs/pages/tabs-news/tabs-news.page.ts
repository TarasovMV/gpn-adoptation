import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { IPageTab, PageTabType } from "../../tabs.interfaces";

export interface IMenuItem {
    name: string,
    logo: string,
};
export interface IPost {
    id: number,
    image: string
    imagePath: string,
    content: string,
    title: string,
    newsCategory: number,
    newsCategoryId: number,
    isSaved?: boolean,
    isImportant?: boolean
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
    public section$: BehaviorSubject<string> = new BehaviorSubject<string>('publications')
    public readonly shareIcon: string = 'assets/icon/news/share.svg';
    public readonly saveIcon: string = 'assets/icon/news/favored.svg';
    public data: IPost[] = [
        {
            id: 0,
            image: '',
            imagePath: 'http://cdnimg.rg.ru/img/content/198/28/66/1000_d_850.jpeg',
            title: 'НОВАЯ РАЗРАБОТКА ТЕХНОПАРКА «ГАЗПРОМ НЕФТИ» И ОМГТУ СНИЖАЕТ РАСХОДЫ НА ДИАГНОСТИКУ ОБОРУДОВАНИЯ',
            content: `Специалисты Технопарка «Газпром нефти» и ОмГТУ создали мобильный комплекс
            для мониторинга состояния промышленного оборудования. Новая система уже прошла серию успешных
            промышленных испытаний и внедряется в производство. По расчетам специалистов, экономический эффект от ее
            использования составит несколько десятков миллионов рублей в год.`,
            newsCategory: null,
            newsCategoryId: 2,
            isSaved: true,
            isImportant: true,
        },
    ];
    public dataToView: IPost[] = [];
    public id: string = '';

    constructor(
        public tabsService: TabsService,
    ) {
    }

    ngOnInit(): void {
        this.getNews();
    }

    public async getNews(): Promise<void> {
        this.data = await this.tabsService.getNews();
        console.log(this.data);
    }
    public changeSection(section: IMenuItem): void {
        this.section$.next(section.logo);
        switch (section.logo) {
            case 'saved': {
                this.dataToView = this.data.filter(x => x.isSaved);                
                break;
            }
            case 'important': {
                this.dataToView = this.data.filter(x => x.isImportant);
                break;
            }
            default: {
                this.dataToView = this.data;
                break;
            }
        };
    }
    public savePost(post: IPost): void {
        post.isSaved = !post.isSaved;
    }
}
