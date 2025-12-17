import { useState, useEffect } from 'react';
import { ChevronLeft, Check } from 'lucide-react';

interface AddReminderScreenProps {
  onBack: () => void;
  selectedCourse: string;
  selectedType: string;
}

const dateOptions = [
  'Today',
  'Tomorrow',
  'Dec 15',
  'Dec 16',
  'Dec 17',
  'Dec 18',
  'Dec 19',
  'Dec 20',
  'Dec 21',
  'Dec 22',
  'Dec 23',
  'Dec 24',
  'Dec 25',
];

const timeOptions = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
];

const calculateTimeRemaining = (selectedDate: string, selectedTime: string) => {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  let targetDay = currentDay;
  let targetMonth = currentMonth;

  if (selectedDate === 'Today') {
    targetDay = currentDay;
  } else if (selectedDate === 'Tomorrow') {
    targetDay = currentDay + 1;
  } else {
    // Parse "Dec 15" format
    const dayNum = parseInt(selectedDate.split(' ')[1]);
    targetDay = dayNum;
    targetMonth = 11; // December (0-indexed)
  }

  // Parse time
  const [time, period] = selectedTime.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  let targetHour = parseInt(hourStr);
  if (period === 'PM' && targetHour !== 12) {
    targetHour += 12;
  } else if (period === 'AM' && targetHour === 12) {
    targetHour = 0;
  }

  const targetDate = new Date(currentYear, targetMonth, targetDay, targetHour, 0, 0);
  const diffMs = targetDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  const days = Math.floor(diffDays);
  const hours = Math.floor(diffHours % 24);

  return { days, hours, totalDays: diffDays };
};

const getReminderTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    exam: 'Exam',
    study: 'Study Session',
    project: 'Project Deadline',
    meeting: 'Meeting',
    class: 'Lab Session',
  };
  return labels[type] || type;
};

export function AddReminderScreen({ onBack, selectedCourse, selectedType }: AddReminderScreenProps) {
  const [step, setStep] = useState<'datetime' | 'confirm' | 'success'>('datetime');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('9:00 AM');
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining('Tomorrow', '9:00 AM'));

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining(selectedDate, selectedTime));
  }, [selectedDate, selectedTime]);

  const handleAddReminder = () => {
    setStep('success');
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const reminderTypeLabel = getReminderTypeLabel(selectedType);
  const isUrgent = timeRemaining.totalDays <= 1;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        {step === 'datetime' && (
          <button onClick={onBack} className="mb-2 active:opacity-60">
            <ChevronLeft className="w-6 h-6 text-blue-500" />
          </button>
        )}
        <h2 className="text-white">
          {step === 'datetime' && 'Set Date & Time'}
          {step === 'success' && 'Reminder Added!'}
        </h2>
        {step === 'datetime' && (
          <p className="text-gray-400 text-xs">{selectedCourse}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Step: Date & Time Selection */}
        {step === 'datetime' && (
          <>
            {/* Reminder Info Card */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Reminder Type</label>
              <div className="text-white text-sm">{reminderTypeLabel}</div>
            </div>

            {/* Date Picker */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-4">
              <label className="text-gray-400 text-xs mb-3 block">Select Date</label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {dateOptions.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`rounded-xl p-3 text-xs transition-colors ${
                      selectedDate === date
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 active:bg-gray-700'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Picker */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-4">
              <label className="text-gray-400 text-xs mb-3 block">Select Time</label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-xl p-3 text-xs transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 active:bg-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Countdown */}
            <div className={`rounded-2xl p-4 mb-4 border ${
              isUrgent 
                ? 'bg-red-500/20 border-red-500/40' 
                : 'bg-blue-500/20 border-blue-500/40'
            }`}>
              <div className="text-center">
                <div className={`text-xs mb-2 ${isUrgent ? 'text-red-400' : 'text-blue-400'}`}>
                  {reminderTypeLabel} is in
                </div>
                <div className={`text-2xl mb-1 ${isUrgent ? 'text-red-400' : 'text-blue-400'}`}>
                  {timeRemaining.days > 0 && `${timeRemaining.days} day${timeRemaining.days !== 1 ? 's' : ''}`}
                  {timeRemaining.days > 0 && timeRemaining.hours > 0 && ' and '}
                  {timeRemaining.hours > 0 && `${timeRemaining.hours} hour${timeRemaining.hours !== 1 ? 's' : ''}`}
                  {timeRemaining.days === 0 && timeRemaining.hours === 0 && 'Less than 1 hour'}
                </div>
              </div>
            </div>

            {/* Add Reminder Button */}
            <button
              onClick={handleAddReminder}
              className="w-full bg-blue-500 rounded-2xl p-4 flex items-center justify-center gap-2 active:bg-blue-600"
            >
              <Check className="w-5 h-5 text-white" />
              <span className="text-white">Add Reminder</span>
            </button>
          </>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-green-500 rounded-full p-8 mb-4">
              <Check className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-white mb-2">Reminder Added Successfully</h3>
            <p className="text-gray-400 text-sm text-center px-4">
              {selectedCourse}
            </p>
            <p className="text-gray-400 text-sm text-center px-4 mt-1">
              {reminderTypeLabel} • {selectedDate} at {selectedTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
