import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.taskId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadTask();

  }

  loadTask() {

    this.taskService.getTaskById(this.taskId)
      .subscribe({
        next: (data) => {
          this.task = data;
        },
        error: (err) => {
          console.error(err);
        }
      });

  }

  updateTask() {

    this.taskService.updateTask(this.taskId, this.task)
      .subscribe({
        next: () => {
          alert('Task updated');
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error(err);
          alert('Update failed');
        }
      });

  }

}