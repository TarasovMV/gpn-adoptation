import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';

@Component({
  selector: 'app-tabs-offline-search',
  templateUrl: './tabs-offline-search.component.html',
  styleUrls: ['./tabs-offline-search.component.scss'],
})
export class TabsOfflineSearchComponent implements OnInit {

  public readonly search: FormControl = new FormControl('');

  constructor(
    public tabsService: TabsService
  ) { }

  ngOnInit() {
    this.search.valueChanges.pipe(
      filter(value => value.length > 1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(
      value => {
        let data = this.tabsService.references$.getValue();
        data = {
          id: data.id,
          name: data.name,
          order: data.order,
          adaptationStages: data.adaptationStages.filter(x => x.name.toLowerCase().indexOf(value) > -1),
        };
        this.tabsService.references$.next(data);
      }
    );
  }
}
