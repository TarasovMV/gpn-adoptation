import {Injectable} from '@angular/core';
import { Storage } from '@capacitor/storage';
import {HttpEvent, HttpResponse} from "@angular/common/http";
import {Network} from "@capacitor/network";

interface ICache {
    url: string;
    method: 'POST' | 'GET' | 'DELETE';
}

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private readonly cachingMap: ICache[] = [
        {
            url: '/api/news',
            method: 'GET'
        },
        {
            url: '/api/Adapt',
            method: 'GET'
        },
        {
            url: '/api/MasterMindCategories',
            method: 'GET'
        },
        {
            url: '/api/HistoryPeriods',
            method: 'GET'
        },
        {
            url: '/api/ReferenceBook',
            method: 'GET'
        }
    ]

    constructor() {
    }

    public async getCache(url: string, method: string): Promise<HttpResponse<any>> {
        const connection = await Network.getStatus();
        if (!!connection.connected) {
            return null;
        }
        const data = await Storage.get({key: url});
        if (!!data?.value) {
            const obj = JSON.parse(data.value);
            return new HttpResponse<any>(obj);
        }
        return null;
    }

    public async cacheResponse(url: string, method: string, event: HttpEvent<any>): Promise<void> {
        if (!this.cachingCheck(url, method)) {
            return;
        }
        await Storage.set({
            key: url,
            value: JSON.stringify(event),
        })
    }

    public cachingCheck(url: string, method: string): boolean {
        for (const item of this.cachingMap) {
            if (method === item.method && url.search(item.url) !== -1) {
                return true;
            }
        }
        return false;
    }
}
