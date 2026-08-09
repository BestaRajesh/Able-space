import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Task, Priority, TaskStatus, ViewMode, AppTab, Student } from './types';
import { INITIAL_TASKS, INITIAL_STUDENTS } from './data/initialData';
import Navbar from './components/Navbar';
import TaskFilters from './components/tasks/TaskFilters';
import BoardView from './components/tasks/BoardView';
import ListView from './components/tasks/ListView';
import CalendarView from './components/tasks/CalendarView';
import AnalyticsView from './components/tasks/AnalyticsView';
import TaskModal from './components/tasks/TaskModal';
import NewTaskModal from './components/tasks/NewTaskModal';
import CaseloadTable from './components/ablespace/CaseloadTable';
import TakeDataStudio from './components/ablespace/TakeDataStudio';
import ProductAnalysisView from './components/ablespace/ProductAnalysisView';
import ReadmeView from './components/ReadmeView';

function AppContent() {
  const { themeConfig } = useTheme();

  // App Navigation Tabs
  const [activeTab, setActiveTab] = useState<AppTab>('tasks');

  // AbleSpace Sub-views
  const [ableSpaceMode, setAbleSpaceMode] = useState<'caseload' | 'take_data' | 'analysis'>('caseload');
  const [selectedStudentForData, setSelectedStudentForData] = useState<Student>(INITIAL_STUDENTS[0]);

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('app_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TASKS;
  });

  // Task Filter & View States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('board');

  // Modals State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskInitialStatus, setNewTaskInitialStatus] = useState<TaskStatus>('todo');
  const [newTaskInitialDueDate, setNewTaskInitialDueDate] = useState<string | undefined>(undefined);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Derive unique tags across all tasks
  const allTags = Array.from(new Set(tasks.flatMap((t) => t.tags)));

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (selectedPriority !== 'all' && t.priority !== selectedPriority) return false;
    if (selectedTag !== 'all' && !t.tags.includes(selectedTag)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesDesc = t.description.toLowerCase().includes(q);
      const matchesTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }
    return true;
  });

  // Task Handlers
  const handleCreateTask = (newTaskData: any) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...newTaskData,
      createdAt: new Date().toISOString().split('T')[0],
      subtasks: [],
      comments: [],
      attachments: [],
      estimatedHours: 4,
      loggedHours: 0,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleBulkAction = (
    action: 'complete' | 'delete' | 'priority',
    ids: string[],
    priority?: Priority
  ) => {
    if (action === 'delete') {
      setTasks(tasks.filter((t) => !ids.includes(t.id)));
    } else if (action === 'complete') {
      setTasks(
        tasks.map((t) => (ids.includes(t.id) ? { ...t, status: 'completed' as TaskStatus } : t))
      );
    } else if (action === 'priority' && priority) {
      setTasks(tasks.map((t) => (ids.includes(t.id) ? { ...t, priority } : t)));
    }
  };

  const handleOpenNewTaskWithStatus = (status: TaskStatus) => {
    setNewTaskInitialStatus(status);
    setNewTaskInitialDueDate(undefined);
    setShowNewTaskModal(true);
  };

  const handleOpenNewTaskWithDate = (dateStr: string) => {
    setNewTaskInitialStatus('todo');
    setNewTaskInitialDueDate(dateStr);
    setShowNewTaskModal(true);
  };

  // AbleSpace Handlers
  const handleStartTakeData = (student: Student) => {
    setSelectedStudentForData(student);
    setAbleSpaceMode('take_data');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTaskModal={() => {
          setNewTaskInitialStatus('todo');
          setNewTaskInitialDueDate(undefined);
          setShowNewTaskModal(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Task Management System */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <TaskFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              viewMode={viewMode}
              setViewMode={setViewMode}
              allTags={allTags}
              onOpenNewTaskModal={() => {
                setNewTaskInitialStatus('todo');
                setNewTaskInitialDueDate(undefined);
                setShowNewTaskModal(true);
              }}
            />

            {/* Render View Mode */}
            {viewMode === 'board' && (
              <BoardView
                tasks={filteredTasks}
                onSelectTask={(task) => setSelectedTask(task)}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onOpenNewTaskModalWithStatus={handleOpenNewTaskWithStatus}
              />
            )}

            {viewMode === 'list' && (
              <ListView
                tasks={filteredTasks}
                onSelectTask={(task) => setSelectedTask(task)}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onDeleteTask={handleDeleteTask}
                onBulkAction={handleBulkAction}
              />
            )}

            {viewMode === 'calendar' && (
              <CalendarView
                tasks={filteredTasks}
                onSelectTask={(task) => setSelectedTask(task)}
                onOpenNewTaskModalWithDate={handleOpenNewTaskWithDate}
              />
            )}

            {viewMode === 'analytics' && <AnalyticsView tasks={tasks} />}
          </div>
        )}

        {/* Tab 2: AbleSpace Caseload & Take Data Studio */}
        {activeTab === 'ablespace' && (
          <div>
            {ableSpaceMode === 'caseload' && (
              <CaseloadTable
                onStartTakeDataSession={handleStartTakeData}
                onOpenProductAnalysis={() => setAbleSpaceMode('analysis')}
              />
            )}

            {ableSpaceMode === 'take_data' && (
              <TakeDataStudio
                student={selectedStudentForData}
                onBackToCaseload={() => setAbleSpaceMode('caseload')}
              />
            )}

            {ableSpaceMode === 'analysis' && (
              <div className="space-y-4">
                <button
                  onClick={() => setAbleSpaceMode('caseload')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-100"
                >
                  ← Back to Caseload Table
                </button>
                <ProductAnalysisView />
              </div>
            )}
          </div>
        )}

        {/* Tab 3: README & Documentation */}
        {activeTab === 'submission_docs' && <ReadmeView />}
      </main>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      )}

      {/* Create New Task Modal */}
      {showNewTaskModal && (
        <NewTaskModal
          initialStatus={newTaskInitialStatus}
          initialDueDate={newTaskInitialDueDate}
          onClose={() => setShowNewTaskModal(false)}
          onCreateTask={handleCreateTask}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
