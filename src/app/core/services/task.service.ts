import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5150/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  deleteTask(id: number) {
  return this.http.delete(
    `http://localhost:5150/api/tasks/${id}`
  );
  }

  getTaskById(id: number) {
  return this.http.get(
    `http://localhost:5150/api/tasks/${id}`
  );
}

updateTask(id: number,task: Task) {
  const request = {
    title: task.title,
    description: task.description,
    status: task.status
  };

  return this.http.put(`${this.apiUrl}/${task.id}`, request);
}
}