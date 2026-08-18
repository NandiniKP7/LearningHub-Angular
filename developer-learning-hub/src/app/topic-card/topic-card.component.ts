import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  learningTopic = input.required<string>();

  selectedLearningTopic = output<string>();


  onSelectedLearningTopic() {
    this.selectedLearningTopic.emit(
      this.learningTopic()
    );
  }
}