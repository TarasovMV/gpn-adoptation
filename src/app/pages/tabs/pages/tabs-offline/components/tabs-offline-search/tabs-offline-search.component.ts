import {Output, Component, EventEmitter, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
    selector: 'app-tabs-offline-search',
    templateUrl: './tabs-offline-search.component.html',
    styleUrls: ['./tabs-offline-search.component.scss'],
})
export class TabsOfflineSearchComponent implements OnInit {
    public readonly searchControl: FormControl = new FormControl('');
    @Input() public disabled: boolean = false;
    @Output() public search: EventEmitter<string> = new EventEmitter<string>();

    constructor(
    ) {}

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(x => this.search.emit(x));
    }
}
