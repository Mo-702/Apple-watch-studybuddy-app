import { ChevronLeft, Calendar, BookOpen, Briefcase, Users, FlaskConical } from 'lucide-react';

interface ReminderTypeSelectionScreenProps {
  courseName: string;
  onBack: () => void;
  onSelectType: (type: string, label: string) => void;
}

const reminderTypes = [
  { value: 'exam', label: 'Add Exam Reminder', icon: Calendar, color: 'bg-red-500' },
  { value: 'study', label: 'Add Study Reminder', icon: BookOpen, color: 'bg-blue-500' },
  { value: 'project', label: 'Add Project Reminder', icon: Briefcase, color: 'bg-purple-500' },
  { value: 'meeting', label: 'Add Meeting Reminder', icon: Users, color: 'bg-green-500' },
  { value: 'class', label: 'Add Lab Reminder', icon: FlaskConical, color: 'bg-orange-500' },
];

export function ReminderTypeSelectionScreen({ 
  courseName, 
  onBack, 
  onSelectType 
}: ReminderTypeSelectionScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">Add Reminder</h2>
        <p className="text-gray-400 text-xs">{courseName}</p>
      </div>

      {/* Reminder Types */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {reminderTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => onSelectType(type.value, type.label)}
                className="w-full bg-gray-900 rounded-2xl p-4 text-left active:bg-gray-800 flex items-center gap-3"
              >
                <div className={`${type.color} rounded-full p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mt-4">
          <p className="text-blue-400 text-xs leading-relaxed">
            Select the type of reminder you want to add for this course.
          </p>
        </div>
      </div>
    </div>
  );
}
