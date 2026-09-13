// Angular features used by this component.
import { Component, computed, effect, inject, signal } from '@angular/core';

// Reusable card used to display each Angular topic.
import { TopicCard } from '../topic-card/topic-card.component';

// Type describing the shape of each topic object.
import { LearningTopic } from '../models/learning-topic.model';

// Service that provides Angular topic data.
import { TopicService } from '../services/topicService.service';


@Component({

  selector: 'app-angular-topics',

  // TopicCard is used inside angular-topics.component.html.
  imports: [TopicCard],

  templateUrl: './angular-topics.component.html',

  styleUrl: './angular-topics.component.css',

})

export class AngularTopicsComponent {

  // Gives this component access to the topic data.
  topicService = inject(TopicService);

  // Page title displayed in the HTML.
  title = 'Angular Topics';

  // Angular logo displayed in the HTML.
  imageUrl = '/Angular.png';

  // Gets the full Angular topic list from TopicService.
  angularLearningTopics: LearningTopic[] = this.topicService.getTopics();

  // Holds the current search text.
  // If a previous search was saved, we restore it from localStorage.
  searchText = signal(localStorage.getItem('angularSearchText') ?? '');

  // Automatically creates a filtered topic list
  // whenever searchText changes.
  filteredAngularTopics = computed(() =>
    this.angularLearningTopics.filter((topic) =>
      topic.title.toLowerCase().includes(this.searchText().toLowerCase())
    )
  );

  // Runs whenever the user types in the search input.
  onSearch(event: Event) {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  // Saves searchText whenever the signal changes.
  saveSearchText = effect(() => {
    localStorage.setItem('angularSearchText', this.searchText());
  });

}