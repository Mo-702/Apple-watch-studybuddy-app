import { ChevronLeft, Calendar, Clock, BookOpen, Bell, AlertTriangle } from 'lucide-react';
import { Exam } from '../App';

interface ExamDetailScreenProps {
  exam: Exam;
  onBack: () => void;
}

const getUrgencyColor = (daysLeft: number) => {
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

const formatTimeRemaining = (daysLeft: number) => {
  if (daysLeft < 1) {
    const hours = Math.round(daysLeft * 24);
    return { value: hours, unit: 'hours' };
  }
  return { value: Math.round(daysLeft), unit: 'days' };
};

export function ExamDetailScreen({ exam, onBack }: ExamDetailScreenProps) {
  const colors = getUrgencyColor(exam.daysLeft);
  const timeRemaining = formatTimeRemaining(exam.daysLeft);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">Exam Details</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Urgency Badge */}
        {exam.daysLeft <= 1 && (
          <div className="flex items-center justify-center mb-4">
            <div className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs">Urgent Exam</span>
            </div>
          </div>
        )}

        {/* Title Card */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-3">
          <label className="text-gray-400 text-xs mb-2 block">Exam</label>
          <div className="text-white mb-1">{exam.title}</div>
          <div className="text-gray-400 text-sm">{exam.course} Course</div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <label className="text-gray-400 text-xs">Date</label>
            </div>
            <div className="text-white text-sm">{exam.date}</div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <label className="text-gray-400 text-xs">Time</label>
            </div>
            <div className="text-white text-sm">{exam.time}</div>
          </div>
        </div>

        {/* Time Remaining */}
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

        {/* Action Buttons - Only "Set Study Reminder" is ACTIVE */}
        <div className="space-y-2">
          <button className="w-full bg-blue-500 rounded-2xl p-4 flex items-center justify-center gap-2 active:bg-blue-600">
            <Bell className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Set Study Reminder</span>
          </button>
          
          {/* Disabled button */}
          <button className="w-full bg-gray-900/50 rounded-2xl p-4 flex items-center justify-center gap-2 cursor-not-allowed">
            <BookOpen className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 text-sm">View Study Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}