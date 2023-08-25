import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableFieldsComponent } from './editable-fields.component';

describe('EditableFieldsComponent', () => {
  let component: EditableFieldsComponent;
  let fixture: ComponentFixture<EditableFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableFieldsComponent]
    });
    fixture = TestBed.createComponent(EditableFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
