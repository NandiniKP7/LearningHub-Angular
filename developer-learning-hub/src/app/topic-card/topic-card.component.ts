import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {
  topic =input.required<string>()
  selectedTopic=output<string>()
  onSelectedTopic()
  {
    this.selectedTopic.emit(this.topic())
  }
  
}
