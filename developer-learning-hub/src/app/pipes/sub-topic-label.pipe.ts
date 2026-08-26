import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subTopicLabel',
})
export class SubTopicLabelPipe implements PipeTransform {
  transform(value:string ,topicNumber:number, subTopicNumber:number): string {
    return `${topicNumber}.${subTopicNumber} ${value}`;
  }
}
