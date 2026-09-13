import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { TopicService } from '../services/topicService.service';

@Component({
  selector: 'app-topic-notes',
  imports: [MarkdownComponent], // allows <markdown> in HTML
  templateUrl: './topic-notes.component.html',
  styleUrl: './topic-notes.component.css',
})

export class TopicNotes {

  private route = inject(ActivatedRoute); // reads current URL
  private topicService = inject(TopicService); // gets topic data from JSON

  topicSlug = this.route.snapshot.paramMap.get('topic'); // gets :topic from URL

  topic = this.topicSlug
    ? this.topicService.getTopicBySlug(this.topicSlug) // finds matching topic
    : undefined;

  markdownFile = this.topic?.readmeFile
    ? `/${this.topic.readmeFile}` // README files are directly inside public/
    : '';

}