## Task Management Frontend

--- 

# Overview

This project is a modern Angular (version 20.2.1) web application that communicates with the Task Management API. It provides a clean user interface for authentication and task management.

The application is deployed on Azure Static Web Apps.

---

# Live Application

Frontend URL:

https://proud-mud-076774a03.7.azurestaticapps.net

---

# Features

User login

JWT authentication

Task creation

Task editing

Task deletion

Pagination

Filtering

Sorting

Internationalization (English / French)

Responsive UI

API integration

Production deployment

--- 

# Tech Stack

Angular

TypeScript

HTML

CSS

RxJS

ngx-translate

Azure Static Web Apps

--- 

# Project Structure

Task Management Frontend
├───app
│   ├───core
│   │   ├───guards
│   │   ├───interceptors
│   │   ├───models
│   │   └───services
│   ├───features
│   │   ├───auth
│   │   │   ├───login
│   │   │   └───register
│   │   └───tasks
│   │       ├───task-create
│   │       ├───task-edit
│   │       ├───task-list
│   │       └───task-update
│   └───shared
│       ├───components
│       │   └───navbar
│       ├───confirm-dialog
│       └───pipes
├───assets
│   └───i18n
├───environments
└───ngx-toastr

---

# Running Locally

Clone repository:

git clone https://github.com/ThaiBangHOANG/Task-management-frontend

Install dependencies:

npm install

Run application:

npm start

Default URL:

http://localhost:4200

---

# Deployment

The frontend is deployed using:

Azure Static Web Apps

Deployment process:

npm run build

Code is pushed to GitHub, and Azure automatically deploys the application.

---

# Purpose of This Project

This project was built to demonstrate:

Fullstack development skills

Clean architecture

Secure authentication

Real-world deployment

Production-ready coding practices

---

# Author

Thai Bang HOANG


It is part of my portfolio for applying to .NET / Angular developer positions in France.
