import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TASKS } from 'src/app/mock-task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task [] = [];
  faTimes = faTimes;

  constructor(
    private taskservice: TaskService
  ) { }

  ngOnInit(): void {
    this.taskservice.getTasks().subscribe(tasks =>[
      this.tasks = tasks
    ]);
  }

  deleteTask(task:Task){
    this.taskservice.deleteTask(task)
    .subscribe(() => (
      this.tasks = this.tasks.filter(t => t.id !== task.id)))
  }
  toggleReminder(task:Task){
    task.reminder = !task.reminder
    this.taskservice.updateTaskReminder(task).subscribe();
  }
  addTask(task:Task){
    this.taskservice.addTask(task).subscribe(tasks =>[
      this.tasks.push(tasks)
    ])
  }
}
