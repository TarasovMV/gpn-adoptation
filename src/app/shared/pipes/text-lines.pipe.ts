import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textLines'
})
export class TextLinesPipe implements PipeTransform {

    transform(value: string): unknown {
        let arr = value.split('\n');
        arr = arr.map(x => `<p class="para">${x}</p>`);
        // return value.replaceAll('\n', '<br>');
        return arr.join('');
        // return arr.join('<br>');
    }
}
