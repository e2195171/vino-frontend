import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupprimCellierComponent } from './dialog-supprim-cellier.component';

describe('DialogSupprimCellierComponent', () => {
  let component: DialogSupprimCellierComponent;
  let fixture: ComponentFixture<DialogSupprimCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSupprimCellierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupprimCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
