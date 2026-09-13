import { Injectable } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';
import { LearningTopic } from '../models/learning-topic.model';

@Injectable({
  providedIn: 'root',
})

export class TopicService {

  getTopics(): LearningTopic[] {
    return angularTopicsData.topics; // returns all Angular topics from JSON
  }

  getTopicBySlug(slug: string): LearningTopic | undefined {
    return angularTopicsData.topics.find(topic => topic.slug === slug); // finds one topic using URL slug
  }

}