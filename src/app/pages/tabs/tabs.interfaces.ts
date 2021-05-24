export interface IPageTab {
    readonly route: PageTabType;
    readonly icon?: string;
}

export type PageTabType = 'news' | 'chat' | 'tests' | 'about' | 'progress' | 'offline';
