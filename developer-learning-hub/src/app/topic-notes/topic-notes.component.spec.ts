import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNotes } from './topic-notes.component';

describe('TopicNotes', () => {
  let component: TopicNotes;
  let fixture: ComponentFixture<TopicNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicNotes],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
