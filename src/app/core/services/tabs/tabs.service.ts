import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProgress } from "src/app/pages/tabs/tabs.interfaces";

@Injectable({
    providedIn: 'root'
})

export class TabsService {
    public restUrl = 'admin.corporateservice.gnkdev.space'

    constructor(private http: HttpClient) {}

    public async getAdaptation(): Promise<IProgress[]> {
        return await this.http.get<IProgress[]>(`http://${this.restUrl}/api/adaptationstages`).toPromise();
    }
}