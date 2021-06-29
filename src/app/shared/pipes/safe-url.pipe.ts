import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(url: string): SafeResourceUrl {
        url = url.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
