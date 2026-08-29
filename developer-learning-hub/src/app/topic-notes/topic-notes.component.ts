import { Component, inject, input } from '@angular/core';
import { TopicService } from '../services/topicService.service';

@Component({
  selector: 'app-topic-notes',
  imports: [],
  templateUrl: './topic-notes.component.html',
  styleUrl: './topic-notes.component.css',
})
export class TopicNotes {

  topicService=inject(TopicService)
  
}