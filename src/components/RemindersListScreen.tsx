import { useState } from 'react';
import { ChevronLeft, Bell, BookOpen, Calendar, Briefcase, Users, Clock, Plus } from 'lucide-react';
import { Screen, Reminder } from '../App';

interface RemindersListScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

const iconMap = {
  study: BookOpen,
  exam: Calendar,
  project: Briefcase,
  class: Clock,
  meeting: Users,
};

const colorMap = {
  study: 'text-blue-500 bg-blue-500/20',
  exam: 'text-red-500 bg-red-500/20',
  project: 'text-purple-500 bg-purple-500/20',
  class: 'text-orange-500 bg-orange-500/20',
  meeting: 'text-green-500 bg-green-500/20',
};

const mockReminders: Reminder[] = [
  { 
    id: '1', 
    title: 'Midterm Exam', 
    time: '9:00 AM', 
    date: 'Tomorrow', 
    type: 'exam', 
    enabled: true, 
    courseName: 'User Interface Design 1', 
    daysLeft: 0.75 
  },
  { 
    id: '2', 
    title: 'Lab Session', 
    time: '10:00 AM', 
    date: 'Tomorrow', 
    type: 'class', 
    enabled: true, 
    courseName: 'User Research', 
    daysLeft: 0.8 
  },
  { 
    id: '3', 
    title: 'Study Session', 
    time: '7:00 PM', 
    date: 'Today', 
    type: 'study', 
    enabled: true, 
    courseName: 'Fundamentals of HCI', 
    daysLeft: 0.3 
  },
  { 
    id: '4', 
    title: 'Project Deadline', 
    time: '11:59 PM', 
    date: 'Dec 18', 
    type: 'project', 
    enabled: true, 
    courseName: 'User Interface Design 2', 
    daysLeft: 5 
  },
  { 
    id: '5', 
    title: 'Team Meeting', 
    time: '2:00 PM', 
    date: 'Dec 16', 
    type: 'meeting', 
    enabled: true, 
    courseName: 'Usability Evaluation', 
    daysLeft: 3 
  },
];

const getReminderColor = (daysLeft?: number) => {
  // Color logic: Red if ≤ 1 day, Blue/Neutral if > 1 day
  if (daysLeft !== undefined && daysLeft <= 1) {
    return 'bg-red-500';
  }
  return 'bg-blue-500';
};

const formatCountdown = (daysLeft?: number) => {
  if (daysLeft === undefined) return '';
  
  if (daysLeft < 1) {
    const hours = Math.round(daysLeft * 24);
    return `${hours} hour${hours !== 1 ? 's' : ''} left`;
  }
  const days = Math.round(daysLeft);
  return `${days} day${days !== 1 ? 's' : ''} left`;
};

const getReminderTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    exam: 'Exam',
    study: 'Study',
    project: 'Project',
    meeting: 'Meeting',
    class: 'Lab',
  };
  return labels[type] || type;
};

export function RemindersListScreen({ onNavigate, onBack }: RemindersListScreenProps) {
  const [reminders] = useState<Reminder[]>(mockReminders);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">HCI Reminders</h2>
        <p className="text-gray-400 text-xs">{reminders.filter(r => r.enabled).length} active</p>
      </div>

      {/* Reminders List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2">
          {reminders.map((reminder) => {
            const Icon = iconMap[reminder.type];
            const bgColor = getReminderColor(reminder.daysLeft);
            const isUrgent = reminder.daysLeft !== undefined && reminder.daysLeft <= 1;
            
            return (
              <button
                key={reminder.id}
                onClick={() => onNavigate('reminderDetail', { reminder })}
                className="w-full bg-gray-900 rounded-2xl p-4 text-left active:bg-gray-800"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${bgColor} rounded-full p-2.5`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{reminder.title}</div>
                    <div className="text-gray-400 text-xs mb-1">{reminder.courseName}</div>
                    <div className="text-gray-500 text-xs">{getReminderTypeLabel(reminder.type)}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-xs">
                    {reminder.date} • {reminder.time}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    isUrgent ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {formatCountdown(reminder.daysLeft)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Add Button */}
        <button
          onClick={() => onNavigate('courseSelection')}
          className="w-full bg-blue-500 rounded-2xl p-4 flex items-center justify-center gap-2 mt-4 active:bg-blue-600"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white text-sm">Add Reminder</span>
        </button>
      </div>
    </div>
  );
}