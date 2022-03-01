import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'trim',
})
export class TrimPipe implements PipeTransform {
    constructor() {}

    transform(input: string): string {
        return input.trim();
    }
}
