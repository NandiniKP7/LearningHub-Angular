import { Component, computed, output, signal, effect } from '@angular/core';
import { TopicCard } from '../topic-card/topic-card.component';
import angularTopicsData from '../angular-learning-topics.json';
import { LearningTopic } from '../models/learning-topic.model';

@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  title = 'Angular Topics';

  imageUrl = '/Angular.png';

  angularLearningTopics: LearningTopic[] = angularTopicsData.topics;

  selectedLearningTopic = output<string>();

  searchText = signal(localStorage.getItem('angularSearchText') ?? '');

  filteredAngularTopics = computed(() =>
    this.angularLearningTopics.filter((topic) => {
      return topic.title.toLowerCase().includes(this.searchText().toLowerCase());
    }),
  );

  onTopicSelected(topic:string) {
    this.selectedLearningTopic.emit(topic);
    console.log(topic)
  }
  onSearch(event: Event) {
    this.searchText.set((event.target as HTMLInputElement).value);
  }
  saveSearchText = effect(() => {
    localStorage.setItem('angularSearchText', this.searchText());
  });
}
