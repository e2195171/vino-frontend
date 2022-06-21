import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifCellierComponent } from './dialog-modif-cellier.component';

describe('DialogModifCellierComponent', () => {
  let component: DialogModifCellierComponent;
  let fixture: ComponentFixture<DialogModifCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifCellierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
