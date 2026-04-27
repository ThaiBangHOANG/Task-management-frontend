import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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
  ) {}

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
          console.log('Tasks:', data);
          this.tasks = data;
          this.totalCount = data.totalCount;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading tasks:', err);
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
    if (!confirm('Delete this task?')) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
