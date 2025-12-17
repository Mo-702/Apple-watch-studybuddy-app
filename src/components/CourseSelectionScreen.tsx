import { ChevronLeft, Check } from 'lucide-react';

interface CourseSelectionScreenProps {
  onBack: () => void;
  onSelectCourse: (course: string) => void;
}

const hciCourses = [
  'Fundamentals of Human-Computer Interaction',
  'Human Factors in Design',
  'User Interface Design 1',
  'User Interface Design 2',
  'User Research',
  'Usability Evaluation',
  'Information Architecture',
  'Inclusive Design',
  'Prototyping Methods',
];

export function CourseSelectionScreen({ onBack, onSelectCourse }: CourseSelectionScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">Select Course</h2>
        <p className="text-gray-400 text-xs">Umm Al-Qura University</p>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2">
          {hciCourses.map((course, index) => (
            <button
              key={index}
              onClick={() => onSelectCourse(course)}
              className="w-full bg-gray-900 rounded-2xl p-4 text-left active:bg-gray-800 flex items-center gap-3"
            >
              <div className="flex-1">
                <div className="text-white text-sm leading-relaxed">{course}</div>
              </div>
              <Check className="w-5 h-5 text-blue-500 opacity-0" />
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mt-4">
          <p className="text-blue-400 text-xs leading-relaxed">
            Select a course to add reminders and track exams for that HCI subject.
          </p>
        </div>
      </div>
    </div>
  );
}