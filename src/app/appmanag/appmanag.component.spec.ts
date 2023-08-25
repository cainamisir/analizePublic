import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmanagComponent } from './appmanag.component';

describe('AppmanagComponent', () => {
  let component: AppmanagComponent;
  let fixture: ComponentFixture<AppmanagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppmanagComponent]
    });
    fixture = TestBed.createComponent(AppmanagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
