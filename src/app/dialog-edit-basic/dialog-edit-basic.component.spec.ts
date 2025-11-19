import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBasicComponent } from './dialog-edit-basic.component';

describe('DialogEditBasicComponent', () => {
  let component: DialogEditBasicComponent;
  let fixture: ComponentFixture<DialogEditBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
