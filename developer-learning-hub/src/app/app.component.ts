import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TopicNotes } from './topic-notes/topic-notes.component';
import { TopicService } from './services/topicService.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    AngularTopicsComponent,
    TopicNotes
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {

  topicService = inject(TopicService);

  title = 'Developer Learning Hub';

  disabledButton = false;

  selectedTechnology = signal(' ');

  technology = 'Learn Angular';

  angularTopics() {
    this.selectedTechnology.set('AngularBasics');

    // Return to the Angular topic list.
    this.topicService.clearSelectedLearningTopic();
  }

  typeScriptTopics() {
    this.selectedTechnology.set('TypeScriptBasics');
  }

  cSharpTopics() {
    this.selectedTechnology.set('C#Basics');
  }
}