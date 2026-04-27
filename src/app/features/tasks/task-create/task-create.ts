import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';

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
    status: 'Pending',
  };

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService,
  ) {}

  createTask() {
    this.toast.info ('Creating task:', this.task.title);

    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.toast.success('Task created successfully');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error(err);
        this.toast.error('Create task failed');
      },
    });
  }
}
