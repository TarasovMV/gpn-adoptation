import {Component, Input, OnInit} from '@angular/core';
import {blobToBase64} from "../../functions/blobToBase64";
import {Directory, Filesystem, ReadFileResult} from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'cashed-img',
    templateUrl: './cashed-img.component.html',
    styleUrls: ['./cashed-img.component.scss'],
})
export class CashedImgComponent implements OnInit {
    private readonly cacheFolder: string = 'images';

    @Input() public set src(url: string) {
        this.loadImage(url).then();
    }

    public _src: string | SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {}

    public async loadImage(imgUrl: string): Promise<void> {
        // TODO: fix caching
        await this.storeImage(imgUrl);
        return;
        const imgName = (await Storage.get({ key: imgUrl })).value;
        const mimeType = this.getMimeTypeByName(imgName);
        await Filesystem.readFile({
            directory: Directory.Cache,
            path: `${imgName}`,
            // path: `${this.cacheFolder}/${imgName}`, TODO: create folder
        }).then(file => this.setImage(file, mimeType)).catch(async e => {
            console.error(e);
            await this.storeImage(imgUrl);
        })
    }

    private setImage(file: ReadFileResult, mimeType: string): void {
        this._src = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/${mimeType};base64,${file.data}`)
    }

    private getMimeTypeByName = (name: string): string => {
        let mimeType = name.split('.').pop();
        return mimeType === 'svg' ? 'svg+xml' : mimeType;
    }

    public async storeImage(imgUrl: string): Promise<void> {
        this._src = imgUrl;
        const url = `https://api-cors-proxy-devdactic.herokuapp.com/${imgUrl}`
        const res = await fetch(url);
        const blob = await res.blob();
        const base64 = await blobToBase64(blob) as string;
        const type = imgUrl.split('.').pop();
        const name = imgUrl
            .replaceAll('/','')
            .replaceAll(':','')
            .replaceAll('.','')
            + '.' + type;
        await Filesystem.writeFile({
            directory: Directory.Cache,
            // path: `${this.cacheFolder}/${name}`, TODO: create folder
            path: `${name}`,
            data: base64,
        });
        await Storage.set({
            key: imgUrl,
            value: name,
        });
    }
}
