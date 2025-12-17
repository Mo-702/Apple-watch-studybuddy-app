import { Bell, Calendar, Clock, BookOpen, Users, Sparkles, ChevronRight, Plus } from 'lucide-react';
import { Screen, Reminder } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  // Mock reminder data for the home screen cards
  const reviewSlidesReminder: Reminder = {
    id: 'home-1',
    title: 'Review HCI Slides',
    time: '7:00 PM',
    date: 'Today',
    type: 'study',
    enabled: true,
    courseName: 'Fundamentals of HCI',
    daysLeft: 0.5, // 12 hours
  };

  const projectMeetingReminder: Reminder = {
    id: 'home-2',
    title: 'HCI Project Meeting',
    time: '2:00 PM',
    date: 'Dec 17',
    type: 'meeting',
    enabled: true,
    courseName: 'User Interface Design 1',
    daysLeft: 3,
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 pb-3">
        <h1 className="text-white">Study Buddy</h1>
        <p className="text-gray-400 text-xs">HCI Course • UQU</p>
      </div>

      {/* Next HCI Exam Card - Priority (Red because < 1 day) */}
      <div className="px-4 pb-3">
        <button
          onClick={() => onNavigate('upcomingExams')}
          className="w-full bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-left active:opacity-80"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white text-sm">Next HCI Exam</span>
            </div>
            <span className="text-red-200 text-xs">18 hours</span>
          </div>
          <div className="text-white mb-1">HCI Midterm Exam</div>
          <div className="text-red-200 text-xs">Tomorrow • 9:00 AM</div>
        </button>
      </div>

      {/* Today's HCI Task (Neutral - more than 1 day) */}
      <div className="px-4 pb-3">
        <button
          onClick={() => onNavigate('reminderDetail', { reminder: reviewSlidesReminder })}
          className="w-full bg-gray-900 rounded-2xl p-4 text-left active:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-blue-500/20 rounded-full p-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm">Review HCI Slides</div>
                <div className="text-gray-400 text-xs">Today • 7:00 PM</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
        </button>
      </div>

      {/* Upcoming HCI Project Meeting */}
      <div className="px-4 pb-3">
        <button
          onClick={() => onNavigate('reminderDetail', { reminder: projectMeetingReminder })}
          className="w-full bg-gray-900 rounded-2xl p-4 text-left active:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-purple-500/20 rounded-full p-2">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm">HCI Project Meeting</div>
                <div className="text-gray-400 text-xs">3 days • 2:00 PM</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
        </button>
      </div>

      {/* AI Suggestion Card */}
      <div className="px-4 pb-3">
        <button
          onClick={() => onNavigate('aiAssistant')}
          className="w-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 text-left active:opacity-80"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white text-sm">AI Suggestion</span>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            You have an HCI exam in 18 hours. Best time to study today is 7 PM.
          </p>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('remindersList')}
            className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 active:bg-gray-800"
          >
            <Bell className="w-6 h-6 text-blue-500" />
            <span className="text-white text-xs">HCI Reminders</span>
          </button>
          
          <button
            onClick={() => onNavigate('upcomingExams')}
            className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-2 active:bg-gray-800"
          >
            <Calendar className="w-6 h-6 text-red-500" />
            <span className="text-white text-xs">HCI Exams</span>
          </button>
        </div>

        {/* Add Reminder Button - Goes to course selection */}
        <button
          onClick={() => onNavigate('courseSelection')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 flex items-center justify-center gap-2 mt-3 active:opacity-80"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white text-sm">Add Reminder</span>
        </button>
      </div>
    </div>
  );
}