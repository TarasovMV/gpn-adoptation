import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FullscreenService {

    public fullScreen: boolean = false;
    constructor() {}
}
