import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTopicsComponent } from './angular-topics.component';

describe('AngularTopicsComponent', () => {
  let component: AngularTopicsComponent;
  let fixture: ComponentFixture<AngularTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTopicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTopicsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
