import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationProfileComponent } from './innovation-profile.component';

describe('InnovationProfileComponent', () => {
  let component: InnovationProfileComponent;
  let fixture: ComponentFixture<InnovationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
