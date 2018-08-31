import { Component, AfterContentInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  id = 1;
  event: any;
  inputArray = [
    {
      id: `id${this.id}`,
      text: '',
      indent: 0
    }
  ];
  currentParent = [];
  constructor() {
  }
  debounce(func, wait?, immediate?) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  ngAfterContentInit() {
    setTimeout(() => {
      $(`#id${this.id}`).focus();
    }, 500);


    const myEfficientLoadDEpendanciesFn = this.debounce((url, Array, Object) => {
      const e = this.event;
      if (e.target.nextElementSibling) {
        // console.log($(e.target.nextElementSibling).hasClass('in'));
        if ($(e.target.nextElementSibling).hasClass('in')) {
          $(e.target.nextElementSibling).removeClass('in')
        } else {
          $(e.target.nextElementSibling).addClass('in')
        }
      }
    });

    $(document).on('click', 'li', (e) => {
      this.event = e;
      myEfficientLoadDEpendanciesFn();
    });
  }

  action(e) {
    const event = e['event'];
    const input = e['input'];
    if (event.shiftKey && event.keyCode === 9) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (this.inputArray.length > 1 || this.inputArray[0]['subchild']) {
        this.createDeleteTabElement(input, this.inputArray)
      }
    } else if (event.keyCode === 13) {
      this.id += 1;
      this.createNewElement(input, this.inputArray);
      setTimeout(() => {
        $(`#id${this.id}`).focus();
      });
    } else if (event.keyCode === 8) {
      if (input['text'] === '') {
        this.deleteAndCreateBackspaceElement(input, this.inputArray);
      }
    } else if (event.keyCode === 9) {
      event.preventDefault();
      if (this.inputArray.length > 1 || this.inputArray[0]['subchild']) {
        this.createTabElement(input, this.inputArray)
      }
    }
  }

  createNewElement(input, inputArray) {
    inputArray.forEach((value, key) => {
      if (value['id'] === input['id']) {
        inputArray.push({
          id: `id${this.id}`,
          text: '',
          indent: 0
        });
      } else if (value.subchild) {
        this.createNewElement(input, value.subchild);
      }
    });
  }


  deleteAndCreateBackspaceElement(input, inputArray) {
    inputArray.forEach((value, key) => {
      if (value['id'] === input['id']) {
        if ($(`#${input['id']}`).parent().prev().length) {
          $(`#${input['id']}`).parent().prev().find('input').focus();
        } else {
          $(`#${input['id']}`).parent().parent().parent().parent().find('input').first().focus();
        }
        setTimeout(() => {
          inputArray.splice(key, 1);
        })
      } else if (value.subchild) {
        this.deleteAndCreateBackspaceElement(input, value.subchild);
      }
    });
  }

  createTabElement(input, inputArray) {
    inputArray.forEach((value, key) => {
      if (value['id'] === input['id']) {
        if (inputArray[key - 1]['subchild']) {
          inputArray[key - 1]['subchild'].push(value);
        } else {
          inputArray[key - 1]['subchild'] = [value];
        }
        setTimeout(() => {
          $(`#id${this.id}`).focus();
        });
        inputArray.splice(key, 1);
      } else if (value.subchild) {
        this.createTabElement(input, value.subchild);
      }
    });
  }

  createDeleteTabElement(input, inputArray) {
    inputArray.forEach((value, key) => {
      if (value['id'] === input['id']) {
        inputArray.splice(key, 1);
        this.currentParent.push(input);
        setTimeout(() => {
          $(`#${input.id}`).focus();
        });
      } else if (value.subchild) {
        this.currentParent = inputArray;
        this.createDeleteTabElement(input, value.subchild);
      }
    });
  }


}
