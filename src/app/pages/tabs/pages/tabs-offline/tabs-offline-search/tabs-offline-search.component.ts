import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tabs-offline-search',
  templateUrl: './tabs-offline-search.component.html',
  styleUrls: ['./tabs-offline-search.component.scss'],
})
export class TabsOfflineSearchComponent implements OnInit {

  public readonly search: FormControl = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(
      value => console.log(value)
    );
  }

}
