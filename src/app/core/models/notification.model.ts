export interface INotifications {
    date: Date;
    notifications: INotification[];
}

export interface INotification {
    id: number;
    header?: string;
    body: string;
    iconPath?: string;
    createdAt: Date;
    notificationType: NotificationType;
}

export enum NotificationType {
    StartPoll = 1,
    Daily = 2,
}
