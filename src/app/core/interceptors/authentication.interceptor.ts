import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone({
            headers: req.headers.append(
                'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE3MzU1MTIsImlzcyI6Imh0dHBzOi8vYWRtaW4uY29ycG9yYXRlc2VydmljZS5nbmtkZXYuc3BhY2UiLCJhdWQiOiJodHRwczovL2FkbWluLmNvcnBvcmF0ZXNlcnZpY2UuZ25rZGV2LnNwYWNlIn0.5t5xp8h_-yzWgMGObOUL9pNDkX7oLbrSw7DrzEpbQfo'
            )
        });
        return next.handle(cloned);
    }
}
