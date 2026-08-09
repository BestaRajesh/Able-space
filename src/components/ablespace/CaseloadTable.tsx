import React, { useState } from 'react';
import { Student } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Plus,
  MoreVertical,
  Activity,
  Calendar,
  Grid,
  List,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  UserPlus,
  FileText,
} from 'lucide-react';
import { INITIAL_STUDENTS } from '../../data/initialData';

interface CaseloadTableProps {
  onStartTakeDataSession: (student: Student) => void;
  onOpenProductAnalysis: () => void;
}

export const CaseloadTable: React.FC<CaseloadTableProps> = ({
  onStartTakeDataSession,
  onOpenProductAnalysis,
}) => {
  const { themeConfig } = useTheme();
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'students' | 'groups' | 'unassigned'>('students');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // New Student form state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newServiceTime, setNewServiceTime] = useState('30 Mins/Wk');

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      s.school.toLowerCase().includes(q) ||
      s.primaryDiagnosis.toLowerCase().includes(q)
    );
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) return;

    const newStudent: Student = {
      id: `std_${Date.now()}`,
      firstName: newFirstName.trim(),
      lastName: newLastName.trim(),
      iepDue: '10/15/2026',
      evalDue: '11/20/2026',
      collaborators: [
        { id: 'c1', initials: 'SL', name: 'Speech Lead', role: 'SLP', color: 'bg-emerald-500' },
      ],
      serviceTime: newServiceTime || '30 Mins/Wk',
      school: newSchool.trim() || 'Central High',
      grade: '4th Grade',
      primaryDiagnosis: 'Speech-Language Support',
      goalsCount: 2,
    };

    setStudents([newStudent, ...students]);
    setShowAddStudentModal(false);
    setNewFirstName('');
    setNewLastName('');
    setNewSchool('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner introducing Part 2 Product Understanding */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-blue-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Part 2 – Product Understanding
              </span>
              <span className="text-xs text-blue-300">AbleSpace Caseload & Take Data Studio</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              Special Education Data Collection & IEP Goal Workflow
            </h2>
            <p className="text-xs text-blue-200 max-w-2xl mt-0.5">
              Click <span className="font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded">Take Data</span> on any student row to launch the interactive live trial counter session, or view the complete UX/UI breakdown.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProductAnalysis}
          className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>View UX/UI Analysis & Report</span>
        </button>
      </div>

      {/* Main Caseload App Layout Container */}
      <div className={`rounded-2xl border ${themeConfig.cardClass} overflow-hidden shadow-xs`}>
        {/* AbleSpace Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                Caseload
                <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">
                  Special Education Student Registry
                </span>
              </h3>
            </div>

            {/* Top Category Tabs & Add Student Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Counters Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Category Counters */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={() => setActiveCategory('students')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeCategory === 'students'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                Students ({students.length})
              </button>

              <button
                onClick={() => setActiveCategory('groups')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeCategory === 'groups'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                Groups (12)
              </button>

              <button
                onClick={() => setActiveCategory('unassigned')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeCategory === 'unassigned'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                Unassigned (39)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students... (⌘ + k)"
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* AbleSpace Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-zinc-800/70 border-b border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-8 text-center">
                  <input type="checkbox" className="rounded border-slate-300 dark:border-zinc-700" />
                </th>
                <th className="p-3.5">Full Name</th>
                <th className="p-3.5">Last Name</th>
                <th className="p-3.5">IEP Due</th>
                <th className="p-3.5">Eval Due</th>
                <th className="p-3.5">Collaborators</th>
                <th className="p-3.5">Service Time</th>
                <th className="p-3.5">School</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 text-xs">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors group"
                  >
                    <td className="p-3.5 text-center">
                      <input type="checkbox" className="rounded border-slate-300 dark:border-zinc-700" />
                    </td>

                    {/* Full Name */}
                    <td className="p-3.5">
                      <button
                        onClick={() => onStartTakeDataSession(student)}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm text-left block"
                      >
                        {student.firstName} {student.lastName}
                      </button>
                      <div className="text-[10px] text-slate-400">{student.primaryDiagnosis}</div>
                    </td>

                    {/* Last Name */}
                    <td className="p-3.5 font-medium text-slate-700 dark:text-zinc-300">
                      {student.lastName}
                    </td>

                    {/* IEP Due */}
                    <td className="p-3.5 font-mono text-slate-600 dark:text-zinc-400">
                      {student.iepDue}
                    </td>

                    {/* Eval Due */}
                    <td className="p-3.5 font-mono text-slate-600 dark:text-zinc-400">
                      {student.evalDue}
                    </td>

                    {/* Collaborators Avatar Stack */}
                    <td className="p-3.5">
                      <div className="flex items-center -space-x-1">
                        {student.collaborators.map((c) => (
                          <span
                            key={c.id}
                            title={`${c.name} (${c.role})`}
                            className={`w-6 h-6 rounded-full ${c.color} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-zinc-900`}
                          >
                            {c.initials}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Service Time */}
                    <td className="p-3.5 text-slate-600 dark:text-zinc-300 font-medium">
                      {student.serviceTime}
                    </td>

                    {/* School */}
                    <td className="p-3.5 text-slate-600 dark:text-zinc-300">
                      {student.school}
                    </td>

                    {/* Actions Column with Highlighted 'Take Data' Button */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onStartTakeDataSession(student)}
                          className="px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950 dark:hover:bg-blue-600 dark:text-blue-300 dark:hover:text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Take Data</span>
                        </button>

                        <button className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-600" />
              Add Student to Caseload
            </h3>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder="e.g. Samuel"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder="e.g. Jackson"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  placeholder="e.g. Lincoln Elementary"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Service Time
                </label>
                <input
                  type="text"
                  value={newServiceTime}
                  onChange={(e) => setNewServiceTime(e.target.value)}
                  placeholder="e.g. OT - 30mins/Wk"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseloadTable;
