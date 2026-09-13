
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SubTopicLabelPipe } from '../pipes/sub-topic-label.pipe';

@Component({
  selector: 'app-topic-card',
  imports: [SubTopicLabelPipe], // Used in HTML for labels like 1.1, 1.2
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})

export class TopicCard {

  // Inputs received from parent AngularTopicsComponent
  learningTopicIndex = input.required<number>();
  learningTopic = input.required<string>();
  subTopics = input.required<string[]>();
  topicSlug = input.required<string>();

  // Local state: controls expand/collapse of subtopics
  isExpandable = signal(false);

  // Used to navigate to the selected topic page
  private router = inject(Router);

  // Opens /angular/topic/<slug>
  openTopic() {
    this.router.navigate([
      '/angular',
      'topic',
      this.topicSlug()
    ]);
  }

  // Switches subtopics between hidden and visible
  toggleDetails() {
    this.isExpandable.update(current => !current);
  }

}

