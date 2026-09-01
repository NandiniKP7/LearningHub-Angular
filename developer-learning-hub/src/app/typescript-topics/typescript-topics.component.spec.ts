import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptTopics } from './typescript-topics.component';

describe('TypescriptTopics', () => {
  let component: TypescriptTopics;
  let fixture: ComponentFixture<TypescriptTopics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptTopics],
    }).compileComponents();

    fixture = TestBed.createComponent(TypescriptTopics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
