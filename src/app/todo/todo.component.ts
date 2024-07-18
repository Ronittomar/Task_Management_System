import { Component } from '@angular/core';
import { Todo } from '../class/todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoValue: String="";

  todoList: Todo[] =[
    {
      content: "Todo 1",
      value: false
    },
    {
      content: "Todo 2",
      value: false
    },
    {
      content: "Todo 3",
      value: false
    }
  ];
  finishedList: Todo[]=[

  ]
  constructor(private modalService: NgbModal){}
  addTodo(){
    this.todoList.push({content:this.todoValue, value:false});
    this.todoValue='';
  }
  changeTodo(i: number){
    const item = this.todoList.splice(i,1);
    console.log(item);
    this.finishedList.push(item[0]);
  }
  changeFinished(i:number)
  {
    const item = this.finishedList.splice(i,1);
    this.todoList.push(item[0]);
  }

  openModal(content: TemplateRef<Element>, i:number, type: String){
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result)=>{
        if(type=='todoList'){
          this.todoList.splice(i,1);
        }
        else{
          this.finishedList.splice(i,1);
        }
      },
      (reason)=>{

      }
    )
  }
}
