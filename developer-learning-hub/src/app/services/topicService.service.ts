import { computed, Injectable, signal } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  getTopics() {
    return angularTopicsData.topics;
  }
  private learningTopic = signal('');

  selectedLearningTopic = this.learningTopic.asReadonly();

  learningTopicUpdated(topic: string) {
    this.learningTopic.set(topic);
  }

  clearSelectedLearningTopic() {
    this.learningTopic.set('');
  }
  hasSelectedTopic = computed(() => this.selectedLearningTopic() !== '');
}
