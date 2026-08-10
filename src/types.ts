export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export type ViewMode = 'board' | 'list' | 'calendar' | 'analytics';

export type AppTab = 'tasks' | 'ablespace' | 'submission_docs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  createdAt: string;
  updatedAt?: string;
  assignee: User;
  tags: string[];
  subtasks: Subtask[];
  comments: TaskComment[];
  attachments: TaskAttachment[];
  estimatedHours?: number;
  loggedHours?: number;
}

export type ThemeMode =
  | 'cyber_teal'
  | 'nordic_frost'
  | 'warm_parchment'
  | 'obsidian_luxe'
  | 'immersive'
  | 'light'
  | 'dark'
  | 'emerald'
  | 'purple'
  | 'slate';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  accentColor: string;
  primaryClass: string;
  borderClass: string;
}

// AbleSpace Specific Types
export interface Collaborator {
  id: string;
  initials: string;
  name: string;
  role: string;
  color: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  iepDue: string;
  evalDue: string;
  serviceType: string;
  collaborators: Collaborator[];
  serviceTime: string;
  school: string;
  grade: string;
  primaryDiagnosis: string;
  goalsCount: number;
  lastSessionDate?: string;
}

export type PromptLevel = 'independent' | 'verbal' | 'gestural' | 'physical' | 'refused';

export interface DataTrial {
  id: string;
  timestamp: string;
  promptLevel: PromptLevel;
  success: boolean;
  notes?: string;
}

export interface IEPGoal {
  id: string;
  studentId: string;
  code: string;
  description: string;
  category: 'Articulation' | 'Behavior' | 'Occupational Therapy' | 'Academic' | 'Social Skills';
  targetAccuracy: number; // percentage
  currentAccuracy: number;
  trials: DataTrial[];
}

export interface DataCollectionSession {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  durationMinutes: number;
  goalsLogged: {
    goalId: string;
    goalDescription: string;
    totalTrials: number;
    successfulTrials: number;
    promptBreakdown: Record<PromptLevel, number>;
  }[];
  therapistNotes: string;
}

export interface ProductImprovement {
  id: string;
  title: string;
  category: 'UX Friction' | 'Mobile Workflow' | 'Data Accuracy' | 'Accessibility';
  problemStatement: string;
  proposedSolution: string;
  impactScore: 'High' | 'Medium' | 'Critical';
  effortScore: 'Low' | 'Medium' | 'High';
}
