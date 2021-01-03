import { Component, ComponentFactoryResolver, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface Item{
  id: number,
  title: string,
  isDone: boolean,
  isEditable: boolean
}

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: Item;
  @Output() delete = new EventEmitter();
  @Output() check = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.delete.emit(this.item);
  }

  onCheck(){
    this.item.isDone = !this.item.isDone;
    this.check.emit();
  }

  onEdit(){
    this.item.isEditable = !this.item.isEditable;
  }

  onBlur($event: any){
    $event.target.blur();
  }
}


