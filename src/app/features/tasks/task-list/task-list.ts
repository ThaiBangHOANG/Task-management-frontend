import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule, ConfirmDialogComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskListComponent {
  tasks: any[] = [];
  page = 1;
  pageSize = 10;
  search = '';
  status?: number;
  isCompleted?: boolean;
  sortBy = 'createdAt';
  sortDescending = true;
  totalCount = 0;
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  showDeleteDialog = false;
  deletingId: number | null = null;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService
      .getTasks(
        this.page,
        this.pageSize,
        this.search,
        this.status,
        this.isCompleted,
        this.sortBy,
        this.sortDescending,
      )
      .subscribe({
        next: (data: any) => {
          this.tasks = data.items ?? data;
          this.totalCount = data.totalCount ?? data.length;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.error(this.translate.instant('FAILED_TO_LOAD_TASKS') + err.message);
          this.isLoading = false;
        },
      });
  }

  get totalPages(): number {
    if (!this.totalCount || !this.pageSize) {
      return 1;
    }

    return Math.ceil(this.totalCount / this.pageSize);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;

      this.loadTasks();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;

      this.loadTasks();
    }
  }

  applyFilters() {
    this.page = 1;

    this.loadTasks();
  }

  trackByTaskId(index: number, task: any): number {
  return task.id;
}

  logout() {
    if (!confirm(this.translate.instant('CONFIRM_LOGOUT'))) {
      return;
    }
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmMessage = '';

  deleteTask(id: number) {
    this.deletingId = id;
    this.confirmMessage = this.translate.instant('CONFIRM_DELETE');
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    if (!this.deletingId) return;

    this.taskService.deleteTask(this.deletingId).subscribe(() => {
      this.loadTasks();

      this.showDeleteDialog = false;

      this.deletingId = null;

      this.toastr.success(this.translate.instant('TASK_DELETED'));
    });
  }

  cancelDelete() {
    this.showDeleteDialog = false;

    this.deletingId = null;
  }
}
