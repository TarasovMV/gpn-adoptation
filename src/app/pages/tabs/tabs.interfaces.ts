export interface IPageTab {
    readonly route: PageTabType;
    readonly icon?: string;
}

export type PageTabType = 'news' | 'chat' | 'tests' | 'about' | 'progress' | 'offline' | 'notifications';

export interface IProgress {
    id: number,
    header: string,
    subStages: IStage[]
    isActive?: boolean;
}

export interface IStage {
    id: number,
    status: number,
    header: string,
    imagePath: string,
    body: string,
    adaptationStageId: number
}
