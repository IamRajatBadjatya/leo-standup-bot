import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStandupComponent } from './create-standup.component';

describe('CreateStandupComponent', () => {
  let component: CreateStandupComponent;
  let fixture: ComponentFixture<CreateStandupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStandupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStandupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
