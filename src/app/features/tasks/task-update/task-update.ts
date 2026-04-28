import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-update.html'
})
export class TaskUpdateComponent implements OnInit {

  task: any = {
    title: '',
    description: '',
    status: 'Pending'
  };

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit() {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(this.id)
      .subscribe({
        next: (data) => {
          this.task = data;
        }
      });

  }

  goBack() {
    this.location.back();
  }

  isSubmitting = false;

  updateTask() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    this.taskService.updateTask(this.id, this.task)
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        }
      });

  }

}