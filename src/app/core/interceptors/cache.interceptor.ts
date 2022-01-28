import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CacheService} from "../services/platform/cache.service";

@Injectable({
    providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cachingResponse: Promise<HttpResponse<any>> = this.cacheService.getCache(req.url, req.method);
        return from(cachingResponse).pipe(
            switchMap(x => {
                if (!!x) {
                    return from(cachingResponse);
                } else {
                    return next.handle(req).pipe(
                        tap(res => this.cacheService.cacheResponse(req.url, req.method, res))
                    );
                }
            })
        );
    }
}
