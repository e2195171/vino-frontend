import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifMotPasseComponent } from './dialog-modif-mot-passe.component';

describe('DialogModifMotPasseComponent', () => {
  let component: DialogModifMotPasseComponent;
  let fixture: ComponentFixture<DialogModifMotPasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifMotPasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifMotPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
