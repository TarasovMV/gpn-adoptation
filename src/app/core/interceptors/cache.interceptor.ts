import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CacheService} from "../services/platform/cache.service";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
    providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cachingResponse: Promise<HttpResponse<any>> = this.cacheService.getCache(req.url, req.method);
        return fromPromise(cachingResponse).pipe(
            switchMap(x => {
                if (!!x) {
                    return fromPromise(cachingResponse);
                } else {
                    return next.handle(req).pipe(
                        tap(res => this.cacheService.cacheResponse(req.url, req.method, res))
                    );
                }
            })
        );
    }
}
