import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ytNoFullscreen',
})
export class YtNoFullscreenPipe implements PipeTransform {
    constructor() {}

    transform(input: string): string {
        return `${input}/?fs=0`;
    }
}
