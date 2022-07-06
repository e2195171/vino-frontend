import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupprimBouteilleAdminComponent } from './dialog-supprim-bouteille-admin.component';

describe('DialogSupprimBouteilleAdminComponent', () => {
  let component: DialogSupprimBouteilleAdminComponent;
  let fixture: ComponentFixture<DialogSupprimBouteilleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSupprimBouteilleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupprimBouteilleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
