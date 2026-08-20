import { Component, computed, output, signal } from '@angular/core';

import { TopicCard } from '../topic-card/topic-card.component';

@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {

  title = "Angular Topics";

  imageUrl = "/Angular.png";


  angularLearningTopics = [
    "Angular Application Setup & Architecture",
    "String Interpolation",
    "Components",
    "Property Binding",
    "Event Binding",
    "Two-Way Binding",
    "Angular Template Control Flow",
    "Parent → Child Communication with input()",
    "Child → Parent Communication with output()",
    "Writable Signals",
    "Computed Signals",
    "Signal Inputs",
    "Signal-Based State Changes",
    "effect()",
    "TypeScript Models / Interfaces in Angular",
    "Pipes",
    "Custom Pipes",
    "Services",
    "Dependency Injection",
    "Sharing Data / State with Services",
    "Routing",
    "Route Parameters & Navigation",
    "Forms Fundamentals",
    "Template-Driven Forms",
    "Reactive Forms",
    "Form Validation",
    "HTTP Client",
    "Calling REST APIs",
    "Loading, Error & Empty States",
    "RxJS Fundamentals",
    "Observables & Subscriptions",
    "Signals and RxJS Together",
    "Component Lifecycle",
    "Reusable Component Design",
    "Angular Application Structure",
    "Testing Angular Components & Services",
    "Build a Feature Independently",
    "linkedSignal()",
    "Route Guards — Basics",
    "HTTP Interceptors — Basics",
    "Change Detection & Performance Basics",
    "Deferred Loading",
    "Accessibility Basics",
    "Build & Deployment Basics"
  ];


  selectedLearningTopic = output<string>();

  searchText=signal('')
  filteredAngularTopics=computed(()=>this.angularLearningTopics.filter((topic)=>{
    return topic.toLowerCase().includes(this.searchText().toLowerCase())
  }))

  onTopicSelected(topic: string) {
    this.selectedLearningTopic.emit(topic);
  }
  onSearch(event:Event){
    this.searchText.set((event.target as HTMLInputElement).value)
  }
}