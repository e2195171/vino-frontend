import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportBouteillesComponent } from './dialog-import-bouteilles.component';

describe('DialogImportBouteillesComponent', () => {
  let component: DialogImportBouteillesComponent;
  let fixture: ComponentFixture<DialogImportBouteillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportBouteillesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportBouteillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
