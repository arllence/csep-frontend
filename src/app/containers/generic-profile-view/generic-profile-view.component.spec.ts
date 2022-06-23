import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericProfileViewComponent } from './generic-profile-view.component';

describe('CommonProfileComponent', () => {
  let component: GenericProfileViewComponent;
  let fixture: ComponentFixture<GenericProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
