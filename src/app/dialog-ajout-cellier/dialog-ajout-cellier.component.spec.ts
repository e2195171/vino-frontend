import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutCellierComponent } from './dialog-ajout-cellier.component';

describe('DialogAjoutCellierComponent', () => {
  let component: DialogAjoutCellierComponent;
  let fixture: ComponentFixture<DialogAjoutCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAjoutCellierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAjoutCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
