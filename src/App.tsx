import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { RemindersListScreen } from './components/RemindersListScreen';
import { ReminderDetailScreen } from './components/ReminderDetailScreen';
import { AIAssistantScreen } from './components/AIAssistantScreen';
import { UpcomingExamsScreen } from './components/UpcomingExamsScreen';
import { AddReminderScreen } from './components/AddReminderScreen';
import { ExamDetailScreen } from './components/ExamDetailScreen';
import { CourseSelectionScreen } from './components/CourseSelectionScreen';
import { ReminderTypeSelectionScreen } from './components/ReminderTypeSelectionScreen';
import { EditReminderScreen } from './components/EditReminderScreen';

export type Screen = 
  | 'home'
  | 'remindersList'
  | 'reminderDetail'
  | 'aiAssistant'
  | 'upcomingExams'
  | 'addReminder'
  | 'examDetail'
  | 'courseSelection'
  | 'reminderTypeSelection'
  | 'editReminder';

export interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'study' | 'exam' | 'project' | 'class' | 'meeting';
  enabled: boolean;
  courseName?: string;
  daysLeft?: number; // For color coding and countdown
}

export interface Exam {
  id: string;
  course: string;
  title: string;
  date: string;
  time: string;
  daysLeft: number; // Can be decimal (e.g., 0.75 for 18 hours)
  priority: 'high' | 'medium' | 'low';
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedReminderType, setSelectedReminderType] = useState<string>('');

  const navigateTo = (screen: Screen, data?: any) => {
    setPreviousScreen(currentScreen);
    if (data?.reminder) {
      setSelectedReminder(data.reminder);
    }
    if (data?.exam) {
      setSelectedExam(data.exam);
    }
    if (data?.course) {
      setSelectedCourse(data.course);
    }
    setCurrentScreen(screen);
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setCurrentScreen('reminderTypeSelection');
  };

  const handleReminderTypeSelect = (type: string, label: string) => {
    setSelectedReminderType(type);
    setCurrentScreen('addReminder');
  };

  const handleEditReminder = () => {
    setCurrentScreen('editReminder');
  };

  const handleSaveReminder = (updatedReminder: Reminder) => {
    // Update the reminder in the state
    setSelectedReminder(updatedReminder);
    // In a real app, this would update the reminder in the backend/state management
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Apple Watch Frame */}
      <div className="relative">
        {/* Watch Case */}
        <div className="w-[368px] h-[448px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[68px] shadow-2xl p-4 flex items-center justify-center">
          {/* Watch Screen */}
          <div className="w-full h-full bg-black rounded-[52px] overflow-hidden relative">
            {/* Screen Content */}
            <div className="w-full h-full bg-black text-white overflow-y-auto scrollbar-hide">
              {currentScreen === 'home' && (
                <HomeScreen onNavigate={navigateTo} />
              )}
              {currentScreen === 'remindersList' && (
                <RemindersListScreen onNavigate={navigateTo} onBack={() => setCurrentScreen('home')} />
              )}
              {currentScreen === 'reminderDetail' && selectedReminder && (
                <ReminderDetailScreen 
                  reminder={selectedReminder} 
                  onBack={() => setCurrentScreen(previousScreen)} 
                  onEdit={handleEditReminder}
                />
              )}
              {currentScreen === 'aiAssistant' && (
                <AIAssistantScreen onBack={() => setCurrentScreen('home')} />
              )}
              {currentScreen === 'upcomingExams' && (
                <UpcomingExamsScreen onNavigate={navigateTo} onBack={() => setCurrentScreen('home')} />
              )}
              {currentScreen === 'addReminder' && (
                <AddReminderScreen 
                  onBack={() => setCurrentScreen('reminderTypeSelection')} 
                  selectedCourse={selectedCourse}
                  selectedType={selectedReminderType}
                />
              )}
              {currentScreen === 'examDetail' && selectedExam && (
                <ExamDetailScreen 
                  exam={selectedExam} 
                  onBack={() => setCurrentScreen('upcomingExams')} 
                />
              )}
              {currentScreen === 'courseSelection' && (
                <CourseSelectionScreen onBack={() => setCurrentScreen('home')} onSelectCourse={handleCourseSelect} />
              )}
              {currentScreen === 'reminderTypeSelection' && (
                <ReminderTypeSelectionScreen 
                  courseName={selectedCourse}
                  onBack={() => setCurrentScreen('courseSelection')} 
                  onSelectType={handleReminderTypeSelect} 
                />
              )}
              {currentScreen === 'editReminder' && selectedReminder && (
                <EditReminderScreen 
                  reminder={selectedReminder} 
                  onBack={() => setCurrentScreen('remindersList')} 
                  onSave={handleSaveReminder}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Digital Crown */}
        <div className="absolute right-0 top-1/4 w-4 h-16 bg-gray-700 rounded-l-lg shadow-inner"></div>
        
        {/* Side Button */}
        <div className="absolute right-0 top-[45%] w-3 h-12 bg-gray-700 rounded-l-md shadow-inner"></div>
      </div>
    </div>
  );
}

export default App;