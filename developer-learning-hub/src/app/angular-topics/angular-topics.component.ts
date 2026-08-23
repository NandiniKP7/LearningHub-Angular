import { Component, computed, output, signal } from '@angular/core';

import { TopicCard } from '../topic-card/topic-card.component';
import angularTopicsData from '../angular-learning-topics.json';
@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  title = 'Angular Topics';

  imageUrl = '/Angular.png';

  angularLearningTopics = angularTopicsData.topics;

  selectedLearningTopic = output<string>();

  searchText = signal('');

  filteredAngularTopics = computed(() =>
    this.angularLearningTopics.filter((topic) => {
      return topic.title.toLowerCase().includes(this.searchText().toLowerCase());
    }),
  );

  onTopicSelected(topic: string) {
    this.selectedLearningTopic.emit(topic);
  }
  onSearch(event: Event) {
    this.searchText.set((event.target as HTMLInputElement).value);
  }
}
