import {Component, Input, OnInit} from '@angular/core';
import {blobToBase64} from "../../functions/blobToBase64";
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';

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

    public _src: string;

    constructor() {
    }

    ngOnInit(): void {}

    public async loadImage(imgUrl: string): Promise<void> {
        const imgName = (await Storage.get({ key: imgUrl })).value;
        await Filesystem.readFile({
            directory: Directory.Cache,
            path: `${imgName}`,
            // path: `${this.cacheFolder}/${imgName}`, TODO: create folder
        }).then(file => this._src = `data:image/png;base64,${file.data}`).catch(async e => {
            console.error(e);
            await this.storeImage(imgUrl);
        })
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
