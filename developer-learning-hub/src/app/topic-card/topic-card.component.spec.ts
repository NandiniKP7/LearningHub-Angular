import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCard } from './topic-card.component';

describe('TopicCard', () => {
  let component: TopicCard;
  let fixture: ComponentFixture<TopicCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
