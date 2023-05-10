import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCreadorComponent } from './template-creator.component';

describe('TemplateCreadorComponent', () => {
  let component: TemplateCreadorComponent;
  let fixture: ComponentFixture<TemplateCreadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCreadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
