import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent {

  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('Tasks:', data);
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
      }
    });
  }

  deleteTask(id: number) {

  if (!confirm('Delete this task?')) {
    return;
  }

  this.taskService.deleteTask(id)
    .subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
      }
    });

}
}
