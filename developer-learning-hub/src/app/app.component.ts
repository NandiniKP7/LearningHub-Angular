import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AngularTopicsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title ="Developer Learning Hub"
   disabledButton =false

   selectedTopic =""
    topic="Learn Angular"
    
   angularTopics(){
    this.selectedTopic="Angular"
   }
   typeScriptTopics()
   {
    this.selectedTopic="TypeScriptBasics"
   }
   cSharpTopics()
   {
   this .selectedTopic="C# basics"
   }
}
