import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() inputArray: any;
  @Output() action = new EventEmitter<any>();
  selectedId = '';
  constructor(
  ) {
  }

  clickAction(event, input, i) {
    const data = {
      event: event,
      input: input,
      i: i
    }
    this.action.emit(data)
  }
  action1(event) {
    this.action.emit(event)
  }
}
