import {BehaviorSubject} from "rxjs";

export interface IPageTab {
    readonly route: PageTabType;
    readonly ripple$?: BehaviorSubject<boolean>;
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
    referenceBookSectionType: ReferenceBookSectionType;
    isActive?: boolean;
    doneCount?: number;
    iconPath?: string;
    imagePath?: string;
}

export interface IAdaptationSubStage {
    id: number;
    name: string;
    order: number;
    description?: string;
    adaptationComponents: IAdaptationComponent[];
    isDone?: boolean;
    disabled?: boolean;
    subStageType?: number;
    isFavourite?: boolean;
    timeString?: string;
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
    result?: IAdaptationComponentResult;
    rate?: {id: number; isActive: boolean}[];
    checked?: boolean;
}

export interface IAdaptationComponentResult {
    comment: string;
    rating: number;
}

export interface IStage {
    id: number;
    status: number;
    header: string;
    imagePath: string;
    body: string;
    adaptationStageId: number;
}

export interface IRecommendation {
    id: number;
    header: string;
    body: string;
    order: number;
    imagePath: string;
    history: IRecommendationHistory[];
}

export interface IRecommendationHistory {
    id: number;
    header: string;
    body: string;
    order: number;
    imagePath: string;
    active?: boolean;
}

export enum ReferenceBookSectionType {
    Default = 0,
    Dictionary = 1,
}
