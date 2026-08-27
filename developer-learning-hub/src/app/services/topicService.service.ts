import { Injectable } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  getTopics()
  {
    return angularTopicsData.topics
  }
}
