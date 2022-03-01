import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./platform/app-config.service";

@Injectable({
    providedIn: 'root'
})
export class FileDownloaderService {
    private readonly restUrl: string;

    constructor(private appConfigService: AppConfigService, private http: HttpClient) {
        this.restUrl = appConfigService.getAttribute('restUrl');
    }

    public getFileBase64(fileId: string) {
        return this.http.get(this.restUrl + "/api/File" + `/${fileId}`, {responseType: "blob"});
    }

    convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        if (!blob) {
            return null;
        }
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        return reader.readAsDataURL(blob);
    });
}
