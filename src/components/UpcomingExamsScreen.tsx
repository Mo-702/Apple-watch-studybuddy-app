import { ChevronLeft, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Screen, Exam } from '../App';

interface UpcomingExamsScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

const mockExams: Exam[] = [
  {
    id: '1',
    course: 'HCI',
    title: 'HCI Midterm Exam',
    date: 'Tomorrow',
    time: '9:00 AM',
    daysLeft: 0.75, // 18 hours = less than 1 day
    priority: 'high',
  },
  {
    id: '2',
    course: 'HCI',
    title: 'HCI Lab Test',
    date: 'Monday, Dec 16',
    time: '10:00 AM',
    daysLeft: 3,
    priority: 'medium',
  },
  {
    id: '3',
    course: 'HCI',
    title: 'HCI Final Project Review',
    date: 'Friday, Dec 20',
    time: '2:00 PM',
    daysLeft: 7,
    priority: 'medium',
  },
  {
    id: '4',
    course: 'HCI',
    title: 'HCI Final Exam',
    date: 'Sunday, Dec 29',
    time: '1:00 PM',
    daysLeft: 16,
    priority: 'high',
  },
];

// Color logic: Red if <= 1 day, neutral if > 1 day
const getExamColors = (daysLeft: number) => {
  if (daysLeft <= 1) {
    return {
      gradient: 'from-red-500 to-red-600 border-red-500/40',
      badge: 'bg-red-500/20 text-red-400',
      isUrgent: true,
    };
  }
  return {
    gradient: 'from-gray-700 to-gray-800 border-gray-600/40',
    badge: 'bg-blue-500/20 text-blue-400',
    isUrgent: false,
  };
};

const formatTimeLeft = (daysLeft: number) => {
  if (daysLeft < 1) {
    const hours = Math.round(daysLeft * 24);
    return `${hours}h`;
  }
  return `${Math.round(daysLeft)}d`;
};

export function UpcomingExamsScreen({ onNavigate, onBack }: UpcomingExamsScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">HCI Exams</h2>
        <p className="text-gray-400 text-xs">{mockExams.length} scheduled</p>
      </div>

      {/* Exams List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {mockExams.map((exam) => {
            const colors = getExamColors(exam.daysLeft);
            
            return (
              <button
                key={exam.id}
                onClick={() => onNavigate('examDetail', { exam })}
                className={`w-full bg-gradient-to-br ${colors.gradient} rounded-2xl p-4 text-left active:opacity-80 border`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-white mb-1">{exam.title}</div>
                    <div className={`text-xs ${colors.isUrgent ? 'text-red-200' : 'text-gray-400'}`}>
                      {exam.course} Course
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${colors.badge}`}>
                    {formatTimeLeft(exam.daysLeft)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className={`w-3 h-3 ${colors.isUrgent ? 'text-red-200' : 'text-gray-400'}`} />
                    <span className={`text-xs ${colors.isUrgent ? 'text-red-100' : 'text-gray-300'}`}>
                      {exam.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className={`w-3 h-3 ${colors.isUrgent ? 'text-red-200' : 'text-gray-400'}`} />
                    <span className={`text-xs ${colors.isUrgent ? 'text-red-100' : 'text-gray-300'}`}>
                      {exam.time}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="bg-gray-900 rounded-2xl p-4 mt-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <p className="text-gray-400 text-xs leading-relaxed">
            Tap any exam to view details. Red cards indicate urgent exams (≤ 1 day).
          </p>
        </div>
      </div>
    </div>
  );
}