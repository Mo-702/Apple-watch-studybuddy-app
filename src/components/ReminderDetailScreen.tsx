import { useState } from 'react';
import { ChevronLeft, Calendar, Clock, Bell, AlertCircle, Edit } from 'lucide-react';
import { Reminder } from '../App';

interface ReminderDetailScreenProps {
  reminder: Reminder;
  onBack: () => void;
  onEdit: () => void;
}

const getUrgencyColor = (daysLeft?: number) => {
  if (daysLeft === undefined) {
    return {
      bg: 'bg-blue-500/20 border-blue-500/40',
      text: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-400',
    };
  }
  
  if (daysLeft <= 1) {
    return {
      bg: 'bg-red-500/20 border-red-500/40',
      text: 'text-red-400',
      badge: 'bg-red-500/20 text-red-400',
    };
  }
  return {
    bg: 'bg-blue-500/20 border-blue-500/40',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
  };
};

const formatTimeRemaining = (daysLeft?: number) => {
  if (daysLeft === undefined) {
    return null;
  }
  
  if (daysLeft < 1) {
    const hours = Math.round(daysLeft * 24);
    return { value: hours, unit: 'hours' };
  }
  return { value: Math.round(daysLeft), unit: 'days' };
};

const getReminderTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    exam: 'Exam',
    study: 'Study',
    project: 'Project',
    meeting: 'Meeting',
    class: 'Lab Session',
  };
  return labels[type] || type;
};

export function ReminderDetailScreen({ reminder, onBack, onEdit }: ReminderDetailScreenProps) {
  const [isEnabled, setIsEnabled] = useState(reminder.enabled);
  const colors = getUrgencyColor(reminder.daysLeft);
  const timeRemaining = formatTimeRemaining(reminder.daysLeft);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">Reminder Details</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Urgency Badge */}
        {reminder.daysLeft !== undefined && reminder.daysLeft <= 1 && (
          <div className="flex items-center justify-center mb-4">
            <div className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">Urgent</span>
            </div>
          </div>
        )}

        {/* Title Card */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-3">
          <label className="text-gray-400 text-xs mb-2 block">Reminder</label>
          <div className="text-white mb-1">{reminder.title}</div>
          {reminder.courseName && (
            <div className="text-gray-400 text-sm">{reminder.courseName}</div>
          )}
        </div>

        {/* Reminder Type */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-3">
          <label className="text-gray-400 text-xs mb-2 block">Type</label>
          <div className="text-white text-sm">{getReminderTypeLabel(reminder.type)}</div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <label className="text-gray-400 text-xs">Date</label>
            </div>
            <div className="text-white text-sm">{reminder.date}</div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <label className="text-gray-400 text-xs">Time</label>
            </div>
            <div className="text-white text-sm">{reminder.time}</div>
          </div>
        </div>

        {/* Countdown */}
        {timeRemaining && (
          <div className={`rounded-2xl p-4 mb-3 border ${colors.bg}`}>
            <div className="text-center">
              <div className={`text-3xl mb-1 ${colors.text}`}>
                {timeRemaining.value}
              </div>
              <div className={`text-xs ${colors.text}`}>
                {timeRemaining.unit} remaining
              </div>
            </div>
          </div>
        )}

        {/* Toggle - ACTIVE */}
        <div className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="text-white text-sm">Enabled</span>
          </div>
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`w-12 h-7 rounded-full transition-colors ${
              isEnabled ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                isEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            ></div>
          </button>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="space-y-2">
          <button 
            onClick={onEdit}
            className="w-full bg-blue-500 rounded-2xl p-4 flex items-center justify-center gap-2 active:bg-blue-600"
          >
            <Edit className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Edit Reminder</span>
          </button>
          <button className="w-full bg-gray-900/50 rounded-2xl p-4 text-gray-600 text-sm cursor-not-allowed">
            Delete Reminder
          </button>
        </div>
      </div>
    </div>
  );
}