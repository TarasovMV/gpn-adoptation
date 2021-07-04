import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textLines'
})
export class TextLinesPipe implements PipeTransform {

    transform(value: string): unknown {
        if (!value) {return ''}
        let arr = value.split('\n');
        arr = arr.map(x => {
            const classes = ['para'];
            if (x.search('<left>') !== -1) {
                classes.push('para__left');
            }
            const classNames = classes.join(' ');
            return `<p class="${classNames}">${x}</p>`
        });
        // return value.replaceAll('\n', '<br>');
        return arr.join('');
        // return arr.join('<br>');
    }
}
