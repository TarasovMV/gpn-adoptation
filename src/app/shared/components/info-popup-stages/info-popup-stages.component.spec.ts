import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoPopupStagesComponent } from './info-popup-stages.component';

describe('InfoPopupStagesComponent', () => {
  let component: InfoPopupStagesComponent;
  let fixture: ComponentFixture<InfoPopupStagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPopupStagesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPopupStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
