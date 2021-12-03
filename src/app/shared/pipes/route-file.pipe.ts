import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'routeFile'
})
export class RouteFilePipe implements PipeTransform {

    transform(value: string): unknown {
        const arr = value.split('\\');
        return arr[arr.length - 1].replace(/\.[^/.]+$/, "");
    }
}
