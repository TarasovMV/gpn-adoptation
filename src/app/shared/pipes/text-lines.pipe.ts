import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textLines'
})
export class TextLinesPipe implements PipeTransform {

    transform(value: string): unknown {
        if (!value) {return ''}
        let arr = value.split('\n');
        console.log(arr);
        //arr = arr.filter(x => x.length > 0);
        arr = arr.map(x => {
            const classes = ['para'];
            if (x.search('<left>') !== -1) {
                classes.push('para__left');
            }
            if (x.search('<indent>') !== -1) {
                classes.push('para__indent');
            }
            const classNames = classes.join(' ');
            return `<div class="${classNames}">${x}</div>`
        });
        // return value.replaceAll('\n', '<br>');
        return arr.join('\n');
        // return arr.join('<br>');
    }
}
