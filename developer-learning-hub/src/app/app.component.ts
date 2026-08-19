import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TopicNotes } from './topic-notes/topic-notes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, AngularTopicsComponent, TopicNotes],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  title = 'Developer Learning Hub';

  disabledButton = false;

  selectedTechnology = signal(' ');

  selectedLearningTopicNotes = '';

  technology = 'Learn Angular';

  angularTopics() {
    this.selectedTechnology.set("AngularBasics");

    // Clicking Angular again returns to the Angular topic list
    this.selectedLearningTopicNotes = '';
  }

  typeScriptTopics() {
    this.selectedTechnology.set('TypeScriptBasics');
  }

  cSharpTopics() {
    this.selectedTechnology.set('C#Basics');
  }
}
