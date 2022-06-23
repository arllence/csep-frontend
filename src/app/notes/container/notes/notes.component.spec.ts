import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationNotesComponent } from './notes.component';

describe('EvaluationNotesComponent', () => {
  let component: EvaluationNotesComponent;
  let fixture: ComponentFixture<EvaluationNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
