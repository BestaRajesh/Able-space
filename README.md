TaskFlow Studio & AbleSpace

A React and TypeScript application developed as a technical assessment combining a task management system with an AbleSpace-inspired caseload and data-collection workflow.

Project Overview

This project consists of two parts:

Part 1 – Task Management System

A complete task management interface for organizing and tracking work across different views.

Part 2 – AbleSpace Product Understanding

An interactive caseload management experience with student records, service information, IEP/evaluation dates, and a Take Data workflow.

Features
Task Management
Create and edit tasks
Delete tasks
Kanban board
List view
Calendar view
Analytics dashboard
Task status management
Priority management
Task search and filtering
Task assignment
Due-date tracking
Subtasks
Comments
Attachments
Tags
Estimated and logged hours
Themes

The application supports multiple visual themes and stores theme preferences using browser storage.

Guest / Demo User Flow

The application provides a guest/demo authentication experience with selectable user profiles for demonstrating different workspace roles.

AbleSpace Caseload

The AbleSpace section provides a fictional but realistic caseload management workflow.

Student records support:

First Name
Last Name
Grade
Primary Diagnosis
IEP Due Date
Evaluation Due Date
Service Type
Service Time
School
Collaborators
Goals
Last Session
Caseload functionality
Search students
Filter student records
Add new students
Display student information in a responsive table
Track IEP deadlines
Track evaluation deadlines
View collaborators
View service information
Launch Take Data sessions

Privacy: All student records in this assessment are fictional demonstration data and do not represent real students or patients.

Take Data Studio

The Take Data workflow provides an interactive interface for recording session information.

Features include:

Session timer
Trial tracking
Prompt hierarchy
Independent responses
Verbal prompts
Gestural prompts
Physical prompts
Refused responses
Frequency tracking
Accuracy calculation
Session notes
Progress information
Product Analysis

The project also includes product improvement concepts focused on reducing workflow friction.

One-Tap Prompt Hierarchy

Provides quick access to commonly used prompt levels during a live session.

Group Session Workflow

Designed to make recording information for multiple students easier during group sessions.

Offline-First Data Queue

A proposed improvement for protecting collected information when network connectivity is unreliable.

AI Progress Report Assistant

A proposed future feature for generating structured progress summaries from collected session data.

Technology Stack
Frontend
React
TypeScript
Tailwind CSS
Lucide React
Vite
Application State
React Hooks
React Context
LocalStorage
In-memory application state
Backend
TypeScript
Node.js
REST API layer

The README only documents technologies that are actually present in the project. No external AI API or database is required unless configured in the application.

Project Structure
src/
├── components/
│   ├── ablespace/
│   │   ├── CaseloadTable.tsx
│   │   ├── ProductAnalysisView.tsx
│   │   └── TakeDataStudio.tsx
│   │
│   ├── tasks/
│   │   ├── AnalyticsView.tsx
│   │   ├── BoardView.tsx
│   │   ├── CalendarView.tsx
│   │   ├── ListView.tsx
│   │   ├── NewTaskModal.tsx
│   │   ├── TaskFilters.tsx
│   │   └── TaskModal.tsx
│   │
│   ├── GuestModal.tsx
│   ├── Navbar.tsx
│   └── ReadmeView.tsx
│
├── context/
│   ├── ThemeContext.tsx
│   └── UserContext.tsx
│
├── data/
│   ├── initialData.ts
│   └── utils.ts
│
├── lib/
│   └── utils.ts
│
├── App.tsx
├── index.css
├── main.tsx
└── types.ts
Running the Project Locally
Prerequisites
Node.js
npm
Git

Check your installation:

node --version
npm --version
git --version
Clone the repository
git clone https://github.com/BestaRajesh/Able-space.git
Enter the project
cd Able-space
Install dependencies
npm install
Start development server
npm run dev

Open the local URL displayed in the terminal.

Production Build

Create a production build:

npm run build

Preview the production build:

npm run preview
Environment Variables

If environment variables are required by the current implementation, create them using the project's .env.example file.

Do not commit private API keys, credentials, or secrets to the public GitHub repository.

Assessment Coverage
Part 1

Task management

Task creation

Task editing

Task deletion

Kanban board

List view

Calendar view

Analytics

Task filtering

Search

Priorities

Assignees

Subtasks

Comments

Attachments

Part 2

AbleSpace-inspired caseload

Student management

Grade

Primary diagnosis

IEP due date

Evaluation due date

Service type

Service time

Collaborators

Take Data workflow

Product analysis

Data Model

The application uses TypeScript interfaces to maintain consistent data structures.

The main entities include:

User
  ↓
Task
  ├── Subtasks
  ├── Comments
  └── Attachments

Student
  ├── Collaborators
  └── IEP Goals
        └── Trials

Initial/demo records are maintained in:

src/data/initialData.ts

This keeps application data separate from UI components and makes the data easier to replace with a database/API in a production implementation.

Future Production Improvements

For a production deployment, the application could be extended with:

Persistent database storage
Secure authentication
Role-based authorization
Server-side validation
API-based data fetching
File storage
Audit logging
Automated testing
CI/CD pipeline
Offline synchronization
Secure handling of sensitive educational data
Developer

Besta Rajesh

Full Stack Developer | AI Enthusiast

GitHub:
https://github.com/BestaRajesh

LinkedIn:
https://www.linkedin.com/in/besta-rajesh-6aa1a2318

Assessment Note

This project was developed as a technical assessment demonstrating frontend engineering, TypeScript development, component architecture, responsive UI implementation, task management workflows, and product thinking.

All educational/student records included in the project are fictional demonstration records.