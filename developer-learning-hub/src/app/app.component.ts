import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { FormsModule } from '@angular/forms';
import { TopicNotes } from './topic-notes/topic-notes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AngularTopicsComponent, FormsModule, TopicNotes],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title ="Developer Learning Hub"
   disabledButton =false

   selectedTopic =""
   selectedTopicNotes=""
    
   angularTopics(){
    this.selectedTopic="AngularBasics"
    this.selectedTopicNotes=""
   }
   typeScriptTopics()
   {
    this.selectedTopic="TypeScriptBasics"
   }
   cSharpTopics()
   {
   this.selectedTopic="C#Basics"
   }
   topic="Learn Angular"


}
