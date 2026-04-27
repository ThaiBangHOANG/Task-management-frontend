import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreateComponent {
  task = {
    title: '',
    description: '',
    status: 'Pending'
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  createTask() {

    console.log('Creating task:', this.task);

    this.taskService.createTask(this.task)
      .subscribe({
        next: () => {
          alert('Task created successfully');
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error(err);
          alert('Create task failed');
        }
      });

  }
}
