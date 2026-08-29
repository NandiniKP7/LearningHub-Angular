import { Component, computed, output, signal, effect, inject } from '@angular/core';
import { TopicCard } from '../topic-card/topic-card.component';
import { LearningTopic } from '../models/learning-topic.model';
import { TopicService } from '../services/topicService.service';
@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  topicService =inject(TopicService)
  title = 'Angular Topics';

  imageUrl = '/Angular.png';

  angularLearningTopics: LearningTopic[] = this.topicService.getTopics();

  selectedLearningTopic = output<string>();

  searchText = signal(localStorage.getItem('angularSearchText') ?? '');

  filteredAngularTopics = computed(() =>
    this.angularLearningTopics.filter((topic) => {
      return topic.title.toLowerCase().includes(this.searchText().toLowerCase());
    }),
  );

  onTopicSelected(topic:string) {
    this.selectedLearningTopic.emit(topic);
    this.topicService.learningTopicUpdated(topic)
    console.log(topic)
  }
  onSearch(event: Event) {
    this.searchText.set((event.target as HTMLInputElement).value);
  }
  saveSearchText = effect(() => {
    localStorage.setItem('angularSearchText', this.searchText());
  });
}
