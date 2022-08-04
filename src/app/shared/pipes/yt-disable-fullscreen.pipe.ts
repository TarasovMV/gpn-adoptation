import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ytDisableFullscreen',
})
export class YtDisableFullscreenPipe implements PipeTransform {
    constructor() {}

    transform(input: string): string {
        return input + '?fs=0';
    }
}
