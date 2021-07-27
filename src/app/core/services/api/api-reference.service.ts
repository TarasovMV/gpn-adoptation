import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class ApiReferenceService {
    private readonly termUrl: string = 'favourite-terms';

    constructor() {}

    public async addFavouriteTerm(termId: number): Promise<void> {
        const terms = await this.getFavouriteTerms();
        terms.push(termId);
        await this.saveTerms(terms);
    }

    public async deleteFavouriteTerm(termId: number): Promise<void> {
        const terms = await this.getFavouriteTerms();
        terms.splice(terms.indexOf(termId), 1);
        await this.saveTerms(terms);
    }

    public async getFavouriteTerms(): Promise<number[]> {
        return JSON.parse((await Storage.get({key: this.termUrl})).value) ?? [];
    }

    private async saveTerms(terms: number[]): Promise<void> {
        await Storage.set({key: this.termUrl, value: JSON.stringify(terms)});
    }
}
