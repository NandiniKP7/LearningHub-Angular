import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TopicNotes } from './topic-notes/topic-notes.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    AngularTopicsComponent,
    TopicNotes
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {

  title = "Developer Learning Hub";

  disabledButton = false;

  selectedTechnology = "";

  selectedLearningTopicNotes = "";

  technology = "Learn Angular";


  angularTopics() {
    this.selectedTechnology = "AngularBasics";

    // Clicking Angular again returns to the Angular topic list
    this.selectedLearningTopicNotes = "";
  }


  typeScriptTopics() {
    this.selectedTechnology = "TypeScriptBasics";
  }


  cSharpTopics() {
    this.selectedTechnology = "C#Basics";
  }
}