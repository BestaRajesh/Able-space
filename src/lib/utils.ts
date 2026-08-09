import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function isOverdue(dateString: string): boolean {
  if (!dateString) return false;
  const due = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function isDueToday(dateString: string): boolean {
  if (!dateString) return false;
  const due = new Date(dateString);
  const today = new Date();
  return (
    due.getDate() === today.getDate() &&
    due.getMonth() === today.getMonth() &&
    due.getFullYear() === today.getFullYear()
  );
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
