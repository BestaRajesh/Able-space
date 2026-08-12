import express from 'express';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAvailablePort(startPort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error) => {
      if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
        server.close(() => resolve(getAvailablePort(startPort + 1)));
      } else {
        reject(error);
      }
    });

    server.once('listening', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Unable to determine available port'));
        return;
      }
      const port = address.port;
      server.close(() => resolve(port));
    });

    server.listen(startPort, '0.0.0.0');
  });
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || (await getAvailablePort(3001));
  const HMR_PORT = Number(process.env.HMR_PORT) || (await getAvailablePort(24679));

  app.use(express.json());

  // In-memory backend data state (seeded)
  let tasks = [
    {
      id: 'task-101',
      title: 'Implement Dark & Light Theme System',
      description: 'Build persistent theme state supporting Light, Dark, Emerald Focus, and Slate palettes with full CSS variable support.',
      status: 'completed',
      priority: 'high',
      dueDate: '2026-08-05',
      createdAt: '2026-08-01',
      assignee: {
        id: 'usr_2',
        name: 'Sarah Chen',
        email: 'sarah.chen@workspace.io',
        role: 'Senior UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      },
      tags: ['UI/UX', 'Figma', 'Theme'],
      estimatedHours: 6,
      loggedHours: 6,
      subtasks: [
        { id: 'sub-1', title: 'Define CSS tokens for primary, surface & borders', completed: true },
        { id: 'sub-2', title: 'Add localStorage persistence hook', completed: true },
        { id: 'sub-3', title: 'Test contrast accessibility (WCAG AA)', completed: true },
      ],
      comments: [
        {
          id: 'c1',
          authorName: 'Sarah Chen',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          content: 'Theme colors match Figma tokens precisely.',
          createdAt: '2026-08-04T10:15:00Z',
        },
      ],
      attachments: [{ id: 'att-1', name: 'figma_theme_tokens.json', url: '#', size: '24 KB', type: 'application/json' }],
    },
    {
      id: 'task-102',
      title: 'Refactor NestJS API endpoints for Task CRUD',
      description: 'Ensure clean API controllers, DTO validations, and guest session handling in compliance with backend assignment guidelines.',
      status: 'in_progress',
      priority: 'urgent',
      dueDate: '2026-08-10',
      createdAt: '2026-08-03',
      assignee: {
        id: 'usr_3',
        name: 'Marcus Vance',
        email: 'marcus.v@workspace.io',
        role: 'Full Stack Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      },
      tags: ['Backend', 'NestJS', 'API'],
      estimatedHours: 8,
      loggedHours: 5,
      subtasks: [
        { id: 'sub-4', title: 'Create CreateTaskDto with class-validator decorators', completed: true },
        { id: 'sub-5', title: 'Implement filter & sort query parameters in controller', completed: true },
        { id: 'sub-6', title: 'Add Guest Auth guard middleware', completed: false },
      ],
      comments: [],
      attachments: [],
    },
    {
      id: 'task-103',
      title: 'Design AbleSpace Caseload Table & Data Take Studio',
      description: 'Recreate the exact Caseload table from AbleSpace Figma/Screenshot and implement the interactive "Take Data" session workflow.',
      status: 'in_progress',
      priority: 'urgent',
      dueDate: '2026-08-12',
      createdAt: '2026-08-04',
      assignee: {
        id: 'usr_1',
        name: 'Alex Rivera',
        email: 'alex.rivera@workspace.io',
        role: 'Product Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      tags: ['Part 2', 'AbleSpace', 'Product'],
      estimatedHours: 12,
      loggedHours: 8,
      subtasks: [
        { id: 'sub-7', title: 'Build student table matching 8 demo student rows', completed: true },
        { id: 'sub-8', title: 'Implement prompt hierarchy logging (I, V, G, P, R)', completed: true },
      ],
      comments: [],
      attachments: [],
    },
  ];

  let sessions: any[] = [];

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), system: 'TaskFlow NestJS API Service' });
  });

  // GET /api/tasks (with filtering, searching, sorting)
  app.get('/api/tasks', (req, res) => {
    const { status, priority, search, tag } = req.query;
    let filtered = [...tasks];

    if (status) {
      filtered = filtered.filter((t) => t.status === status);
    }
    if (priority) {
      filtered = filtered.filter((t) => t.priority === priority);
    }
    if (tag) {
      filtered = filtered.filter((t) => t.tags.includes(String(tag)));
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      total: tasks.length,
      data: filtered,
    });
  });

  // POST /api/tasks - Create task with validation
  app.post('/api/tasks', (req, res) => {
    const { title, description, priority, status, dueDate, tags, assignee } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Validation error: Task title is required.' });
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      status: status || 'todo',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      assignee: assignee || {
        id: 'usr_guest',
        name: 'Guest User',
        email: 'guest@ablespace.io',
        role: 'Evaluator',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      },
      tags: Array.isArray(tags) ? tags : ['General'],
      subtasks: [],
      comments: [],
      attachments: [],
      estimatedHours: 4,
      loggedHours: 0,
    };

    tasks.unshift(newTask);
    res.status(201).json({ success: true, data: newTask });
  });

  // PUT /api/tasks/:id
  app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date().toISOString() };
    res.json({ success: true, data: tasks[index] });
  });

  // DELETE /api/tasks/:id
  app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);
    res.json({ success: true, message: 'Task deleted successfully' });
  });

  // POST /api/tasks/bulk - Bulk operations
  app.post('/api/tasks/bulk', (req, res) => {
    const { action, ids, updatePayload } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty task IDs array' });
    }

    if (action === 'delete') {
      tasks = tasks.filter((t) => !ids.includes(t.id));
    } else if (action === 'update' && updatePayload) {
      tasks = tasks.map((t) => (ids.includes(t.id) ? { ...t, ...updatePayload } : t));
    }

    res.json({ success: true, message: `Bulk ${action} executed for ${ids.length} tasks` });
  });

  // POST /api/data-collection/session
  app.post('/api/data-collection/session', (req, res) => {
    const session = req.body;
    sessions.unshift({ ...session, id: `sess_${Date.now()}`, createdAt: new Date().toISOString() });
    res.status(201).json({ success: true, message: 'AbleSpace therapy session recorded successfully', data: session });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: HMR_PORT,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
  });
}

startServer();
