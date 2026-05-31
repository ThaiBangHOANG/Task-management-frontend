import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreateComponent {
  task = {
    title: '',
    description: '',
    status: 0,
  };

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastrService,
    private location: Location,
    private translate: TranslateService
  ) {}

  isSubmitting = false;

  goBack() {
    this.location.back();
  }

  createTask() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.toast.success(this.translate.instant('TASK_CREATED_SUCCESSFULLY'));

        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error(err);

        this.toast.error(this.translate.instant('FAILED_TO_CREATE_TASK'));

        this.isSubmitting = false;
      },
    });
  }
}