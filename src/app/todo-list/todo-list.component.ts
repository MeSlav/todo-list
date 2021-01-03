import { Component, Input, OnInit } from '@angular/core';
import { Item } from "./todo-item/todo-item.component";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  title: string = "Todo-list";
  previousTitle:string;
  titleIsEditable:boolean;
  currentFilter: string;

  @Input() todos: Item[] = [];
  id:number = 0;

  constructor() {
    this.id++;
  }

  ngOnInit(): void {
    titleIsEditable: false;
    this.title = "Todo-list";
    this.previousTitle = this.title;
    this.currentFilter = "all";
  }

  onChange(){
    console.log("change");
  }

  onTitleEdit(isCancel?:boolean){
    if(isCancel){
      this.title = this.previousTitle;
      this.titleIsEditable = !this.titleIsEditable;
      return;
    }
    this.previousTitle = this.title;
    this.titleIsEditable = !this.titleIsEditable;
  }

  onBlur($event:any){
    $event.stopPropagation();
  }

  addTodo($event: any){
    if($event.target.value.trim().length === 0) return;
    
    //change the view to "all" if todo array is empty
    if(this.todos.length === 0){
      //reset filter back to all if all items are deleted
      this.currentFilter =  "all";
    }

    let input: string = $event.target.value;
    this.todos.push({
        id: this.id,
        title: input,
        isDone: false,
        isEditable: false
    });
    
    this.id++;
    $event.target.value = "";
  }

  notDoneTodos(){
    return this.todos.filter(todo => !todo.isDone);
  }

  doneTodos(){
    return this.todos.filter(todo => todo.isDone);
  }

  deleteTodo(todo?:any){
    if(!todo) return;
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateCheck();
  }

  deleteSelected(){
    this.todos = this.notDoneTodos();
  }

  hasItems(){
    return (this.todos.length>0);
  }

  hasChecked(){
    return this.todos.some((element: Item)=>element.isDone);
  }

  selectAll(){
    //check every item if there are any unchecked items and check all
    if(this.todos.some((element: Item)=>!element.isDone)){
        this.todos.forEach(todo=>todo.isDone=true);
        return;
    }else{
      //else (if every item is checked and user clicks on "check all") then every item will be unchecked
      this.todos.forEach(todo=>todo.isDone=false);
      return;
    }
  }

  updateCheck(){
    if(this.todos.every((element: Item)=>element.isDone) && this.todos.length>0){
      (document.getElementById("horns") as HTMLFormElement).checked = true;
      return false;//returns false to indicate that the array didnt have all values checked
    }else{
      (document.getElementById("horns") as HTMLFormElement).checked = false;
      return true;
    }
  }

  setFilter(filterName: string){
    this.currentFilter = filterName;
  }

  checkFilter(filterName: string){
    return this.currentFilter === filterName;
  }

  updateNotHaveMessage(){
    if(this.currentFilter === 'all' || this.todos.length === 0){
      return "Todo-list is empty";
    }else if(this.currentFilter === 'checked'){
      return "No checked items";
    }else{
      return "No unchecked items";
    }
  }

  resetFilter(){
    /*if(this.todos.length === 0){
      //reset filter back to all if all items are deleted
      this.currentFilter =  "all";
    }*/
    console.log("triggered");
  }
}
