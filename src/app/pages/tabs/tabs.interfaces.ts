export interface IPageTab {
    readonly route: PageTabType;
    readonly icon?: string;
}

export type PageTabType = 'news' | 'chat' | 'tests' | 'about' | 'progress' | 'offline' | 'notifications';

export interface IProgress {
    id: number;
    name: string;
    order: number;
    adaptationStages: IAdaptationStages[];
}

export interface IAdaptationStages {
    id: number;
    name: string;
    order: number;
    adaptationSubStages: IAdaptationSubStages[];
    isActive?: boolean;
    doneCount?: number;
}

export interface IAdaptationSubStages {
    id: number;
    name: string;
    order: number;
    adaptationComponents: IAdaptationComponents[];
    isDone?: boolean;
    disabled?: boolean;
}

export interface IAdaptationComponents {
    id: number;
    order: number;
    componentType: number;
    adaptationSubStageId?: number;
    header?: string;
    body?: string;
    footer?: string;
    imagePath?: string;
    filePath?: string;
    videoPath?: string;
    isActive?: boolean;
}

export interface IStage {
    id: number;
    status: number;
    header: string;
    imagePath: string;
    body: string;
    adaptationStageId: number;
}
