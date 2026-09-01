import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpTopics } from './csharp-topics.component';

describe('CsharpTopics', () => {
  let component: CsharpTopics;
  let fixture: ComponentFixture<CsharpTopics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsharpTopics],
    }).compileComponents();

    fixture = TestBed.createComponent(CsharpTopics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
