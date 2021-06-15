import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textLines'
})
export class TextLinesPipe implements PipeTransform {

    transform(value: string): unknown {
        return value.replaceAll('\n', '<br>');
    }

}
