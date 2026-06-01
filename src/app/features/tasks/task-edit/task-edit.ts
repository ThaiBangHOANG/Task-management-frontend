import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEditComponent implements OnInit {

  task: any = {
    title: '',
    description: '',
    status: 0
  };

  taskId!: number;
  isSubmitting: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {

    this.taskId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadTask();

  }

  goBack() {
    this.location.back();
  }

  loadTask() {

    this.taskService.getTaskById(this.taskId)
      .subscribe({
        next: (data) => {
          this.task = data;
        },
        error: (err) => {
          this.toastr.error(this.translate.instant('FAILED_TO_LOAD_TASKS'));
          return throwError(() => err);  
                }
      });

  }

  updateTask() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.taskService.updateTask(this.taskId, this.task)
      .subscribe({
        next: () => {
          this.toastr.success(this.translate.instant('TASK_UPDATED_SUCCESSFULLY'));
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.toastr.error(this.translate.instant('FAILED_TO_UPDATE_TASK'));

          return throwError(() => err);
        }
      });

  }

}