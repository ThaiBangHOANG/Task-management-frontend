import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
  ) {}

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
          this.tasks = data;
          this.totalCount = data.totalCount;
          this.isLoading = false;
        },
        error: (err) => {
         this.toastr.error('Failed to load tasks' + err.message);
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

  logout() {
    if (!confirm('Are you sure you want to logout?')) {
      return;
    }
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  deleteTask(id: number) {

    const confirmed = confirm('Are you sure you want to delete this task?');

    if (!confirmed) {
      return;
    }

    this.deletingId = id;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
        this.toastr.success('Task deleted successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to delete task');
        this.deletingId = null;
      },
    });
  }
}
