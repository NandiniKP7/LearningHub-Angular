export interface LearningTopic {

  id: number; // topic number

  slug: string; // URL-friendly topic name

  title: string; // topic title

  plannedLearningTime: string | null; // estimated learning time

  subTopics: string[]; // list of subtopics

  category: string; // topic category

  readmeFile: string | null; // markdown file for this topic

}