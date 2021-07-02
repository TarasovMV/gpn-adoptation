export interface IPageTab {
    readonly route: PageTabType;
}

export type PageTabType = 'news' | 'chat' | 'tests' | 'about' | 'progress' | 'offline' | 'notifications';

// TODO: replace all below interfaces
export interface IProgress {
    id: number;
    name: string;
    order: number;
    adaptationStages: IAdaptationStage[];
}

export interface IAdaptationStage {
    id: number;
    name: string;
    description?: string;
    order: number;
    adaptationSubStages: IAdaptationSubStage[];
    isActive?: boolean;
    doneCount?: number;
    iconPath?: string;
}

export interface IAdaptationSubStage {
    id: number;
    name: string;
    order: number;
    adaptationComponents: IAdaptationComponent[];
    isDone?: boolean;
    disabled?: boolean;
    subStageType?: number;
}

export interface IAdaptationComponent {
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
    rate?: {id: number; isActive: boolean}[];
}

export interface IStage {
    id: number;
    status: number;
    header: string;
    imagePath: string;
    body: string;
    adaptationStageId: number;
}
