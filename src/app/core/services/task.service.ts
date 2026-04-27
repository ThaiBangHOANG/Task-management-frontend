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

getTasks(
  page: number,
  pageSize: number,
  search?: string,
  status?: number,
  isCompleted?: boolean,
  sortBy?: string,
  sortDescending?: boolean
) {

  let params: any = {
    page,
    pageSize
  };

  if (search)
    params.search = search;

  if (status !== undefined)
    params.status = status;

  if (isCompleted !== undefined)
    params.isCompleted = isCompleted;

  if (sortBy)
    params.sortBy = sortBy;

  if (sortDescending !== undefined)
    params.sortDescending = sortDescending;

  return this.http.get(this.apiUrl, {
    params
  });

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