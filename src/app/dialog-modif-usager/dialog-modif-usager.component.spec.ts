import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifUsagerComponent } from './dialog-modif-usager.component';

describe('DialogModifUsagerComponent', () => {
  let component: DialogModifUsagerComponent;
  let fixture: ComponentFixture<DialogModifUsagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifUsagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifUsagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
