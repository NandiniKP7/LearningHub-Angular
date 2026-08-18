import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-notes',
  imports: [],
  templateUrl: './topic-notes.component.html',
  styleUrl: './topic-notes.component.css',
})
export class TopicNotes {

  topicNotes = input.required<string>();
}