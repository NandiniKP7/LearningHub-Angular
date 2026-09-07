import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { SubTopicLabelPipe } from '../pipes/sub-topic-label.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-card',
  imports: [TitleCasePipe,SubTopicLabelPipe],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  learningTopic = input.required<string>();
  learningTopicIndex=input.required<number>();
   router = inject(Router);
topicSlug=input.required<string>()

  selectedLearningTopic = output<string>();
  isExpandable =signal(false)

onSelectedLearningTopic() {
  this.selectedLearningTopic.emit(
    this.learningTopic()
  );

  this.router.navigate([
    '/angular',
    'topic',
    this.topicSlug()
  ]);
}
  subTopics=input.required<string[]>();
  toggleDetails()
  {
  this.isExpandable.update(current => !current)
  }
  
 
  
}