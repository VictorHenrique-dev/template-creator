import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMergeComponent } from './modal-merge.component';

describe('ModalMergeComponent', () => {
  let component: ModalMergeComponent;
  let fixture: ComponentFixture<ModalMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
