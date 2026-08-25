import { TitleCasePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [TitleCasePipe],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  learningTopic = input.required<string>();
  learningTopicIndex=input.required<number>();

  selectedLearningTopic = output<string>();
  isExpandable =signal(false)

  onSelectedLearningTopic() {
    this.selectedLearningTopic.emit(
      this.learningTopic()
    );
  }
  subTopics=input.required<string[]>();
  toggleDetails()
  {
  this.isExpandable.update(current => !current)
  }
}