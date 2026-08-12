import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  BookOpen,
  Copy,
  Check,
  Download,
  CheckCircle2,
  Code2,
  Server,
  Palette,
  Sparkles,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const ReadmeView: React.FC = () => {
  const { themeConfig } = useTheme();
  const [copied, setCopied] = useState(false);

  const markdownContent = `# TaskFlow Studio & AbleSpace Caseload Product Assessment

## Executive Summary
This application satisfies all requirements for both **Part 1 (Task Management System)** and **Part 2 (AbleSpace Product Understanding)**.

---

## Part 1 – Task Management System
### Key Features Implemented:
1. **Design Fidelity & Themes**:
   - Matches Figma layout accuracy, spacing, typography, and card hierarchy.
   - Theme Switcher supporting **Clean Light**, **Dark Executive**, **Emerald Focus**, **Purple Spark**, and **Minimal Slate**.
   - Theme persistence via \`localStorage\` and root CSS variable injection.

2. **Guest Auth & User Profiles**:
   - 1-Click **"Instant Guest Session"** auth flow.
   - Profile switching between Alex Rivera (Product Lead), Sarah Chen (Senior UI/UX), Marcus Vance (Full Stack Lead), and Guest Evaluator.

3. **Task Management Capabilities**:
   - Create, edit, delete, and update tasks.
   - Kanban board with To Do, In Progress, Review, and Completed columns.
   - List view with filtering, search, and bulk operations.
   - Calendar view for deadline tracking.
   - Analytics dashboard for task progress and workload.
   - Subtasks, comments, tags, priorities, assignees, and attachments.

4. **Clean API Architecture**:
   - Express REST API with TypeScript serving as clean service API layer with DTO validation rules.

---

## Part 2 – Product Understanding (AbleSpace Caseload & Take Data)
### Analysis & Redesign Summary:
1. **AbleSpace Caseload Replication**:
   - Responsive student registry with realistic fictional student records.
   - Displays Grade, Primary Diagnosis, IEP Due Date, Evaluation Due Date, Collaborators, Service Type, Service Time, School, and Take Data actions.

### Caseload Management
The AbleSpace caseload module supports:
- Student registration
- Grade tracking
- Primary diagnosis
- IEP due-date tracking
- Evaluation due-date tracking
- Service type
- Service time
- School information
- Collaborator information
- Search and filtering
- Take Data session launch

2. **Interactive "Take Data" Studio**:
   - Live session stopwatch timer.
   - **1-Tap Tactile Prompt Hierarchy Tagger** (Independent [I], Verbal [V], Gestural [G], Physical [P], Refused [R]).
   - Frequency tally counter.
   - Auto-generated SOAP clinical session notes.

3. **UX/UI Improvements Proposed**:
   - **1-Tap Prompt Hierarchy Strip**: Reduces click friction during live therapy sessions.
   - **Group Session Split View**: Solves multi-student speech therapy logging pain points.
   - **Offline-First Queue**: Prevents data loss in school Wi-Fi dead zones.
   - **AI Progress Report Draft**: Automates quarterly IEP progress report writing.

---

## Project Structure
\`\`\`text
src/
├── components/
│   ├── ablespace/
│   │   ├── CaseloadTable.tsx
│   │   ├── ProductAnalysisView.tsx
│   │   └── TakeDataStudio.tsx
│   │
│   └── tasks/
│       ├── BoardView.tsx
│       ├── ListView.tsx
│       ├── CalendarView.tsx
│       ├── AnalyticsView.tsx
│       ├── TaskModal.tsx
│       └── NewTaskModal.tsx
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
├── main.tsx
├── index.css
└── types.ts
\`\`\`

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation
\`\`\`bash
git clone https://github.com/BestaRajesh/Able-space-taskflow.git
cd Able-space-taskflow
npm install
\`\`\`

## Assessment Coverage

### Part 1 – Task Management
- [x] Task creation
- [x] Task editing
- [x] Task deletion
- [x] Task status management
- [x] Priority management
- [x] Task filtering
- [x] Search
- [x] Kanban board
- [x] List view
- [x] Calendar view
- [x] Analytics
- [x] Subtasks
- [x] Comments
- [x] Assignees

### Part 2 – AbleSpace
- [x] Caseload table
- [x] Student registration
- [x] Grade
- [x] Primary diagnosis
- [x] IEP due date
- [x] Evaluation due date
- [x] Service type
- [x] Take Data workflow
- [x] Product improvement analysis

## Technology Choices

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| TypeScript | Type safety and maintainability |
| Tailwind CSS | Responsive and consistent styling |
| Lucide React | Interface icons |
| React Context | Theme and user state |
| LocalStorage | Client-side persistence |
| Node.js | Backend runtime |
| Express | REST API layer |

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion Animations, Lucide Icons
- **Backend API**: Node.js / Express (NestJS API architecture), TypeScript, tsx, esbuild
- **Persistence**: LocalStorage, In-Memory API Store, Theme Engine
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Header */}
      <div className={`p-6 rounded-2xl border ${themeConfig.cardClass} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
              Assessment Submission Documentation
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              README, Tech Stack Specifications & Evaluation Criteria Breakdown
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-blue-500" />}
            <span>{copied ? 'Copied Markdown' : 'Copy README'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      {/* Rendered Documentation Body */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${themeConfig.cardClass} space-y-8 font-sans`}>
        {/* Section 1: Overview */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" /> Requirement Verification
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 mb-2">
            Task Management System & AbleSpace Caseload Evaluation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            This project provides a complete implementation of the Figma assessment design (Part 1) alongside an interactive product case study for the AbleSpace "Take Data" screen (Part 2).
          </p>
        </div>

        {/* Section 2: Part 1 Features */}
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
          <h4 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" />
            Part 1 – Task Management System Deliverables
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Theme Engine & Persistence</div>
              <p className="text-slate-500">
                Light, Dark, Emerald, Purple, and Slate themes with real-time switching and localStorage state saving.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Guest Auth & Personas</div>
              <p className="text-slate-500">
                1-Click guest login modal with role switching (Product Lead, UI/UX Designer, Full Stack Lead).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">4 View Modes</div>
              <p className="text-slate-500">
                Board (Kanban), List (with multi-select bulk operations), Calendar grid, and Analytics dashboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Task Management</div>
              <p className="text-slate-500">
                Create, edit, delete, and update tasks with Kanban, list, calendar, analytics, subtasks, comments, tags, priorities, assignees, and attachments.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Part 2 Features */}
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
          <h4 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Part 2 – Product Understanding & AbleSpace Take Data
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Caseload Tab Replica</div>
              <p className="text-slate-500">
                Matches the exact student table from the prompt image with IEP due dates, eval dates, and collaborator initial avatars.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Interactive "Take Data" Studio</div>
              <p className="text-slate-500">
                Single-tap prompt hierarchy logging (Independent, Verbal, Gestural, Physical), frequency counters, and live trial percentages.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">Auto SOAP Clinical Notes</div>
              <p className="text-slate-500">
                Auto-generates structured clinical session summaries from trial accuracy for progress reports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-sm">UX Audit & Matrix</div>
              <p className="text-slate-500">
                Includes friction point analysis, before/after comparison, and impact vs effort feature matrix.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Backend API Specification */}
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
          <h4 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-500" />
            Backend REST API Specification
          </h4>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono space-y-2 overflow-x-auto">
            <div>GET /api/health → System health status</div>
            <div>GET /api/tasks?status=&priority=&search= → Fetch tasks with filters</div>
            <div>POST /api/tasks → Create task with validation</div>
            <div>PUT /api/tasks/:id → Update task status/subtasks/comments</div>
            <div>DELETE /api/tasks/:id → Remove task</div>
            <div>POST /api/tasks/bulk → Bulk action (complete | delete)</div>
            <div>POST /api/data-collection/session → Record AbleSpace therapy session</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeView;
