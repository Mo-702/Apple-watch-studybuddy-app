import { useState } from 'react';
import { ChevronLeft, Sparkles, MessageCircle } from 'lucide-react';

interface AIAssistantScreenProps {
  onBack: () => void;
}

const suggestions = [
  "You have an HCI exam in 18 hours. Want to add another reminder?",
  "Best time to study HCI today is 7 PM based on your schedule.",
  "You haven't reviewed HCI slides this week. Want to add it to your plan?",
  "HCI project report due in 5 days. Start working on it today?",
  "HCI lab session tomorrow at 10 AM. Review the materials tonight.",
];

export function AIAssistantScreen({ onBack }: AIAssistantScreenProps) {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState('');

  const handleAskAI = () => {
    setShowSuggestion(true);
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setCurrentSuggestion(randomSuggestion);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <button onClick={onBack} className="mb-2 active:opacity-60">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <h2 className="text-white">AI Assistant</h2>
        <p className="text-gray-400 text-xs">HCI Study Helper</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {!showSuggestion ? (
          <>
            {/* AI Icon */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-8 mb-4">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-white mb-2 text-center">HCI Study Assistant</h3>
              <p className="text-gray-400 text-xs text-center px-4">
                Get smart suggestions for your HCI course
              </p>
            </div>

            {/* Recent Suggestions */}
            <div className="space-y-3 mb-4">
              <label className="text-gray-400 text-xs">Recent Suggestions</label>
              
              <div className="bg-gray-900 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    You have an HCI exam in 18 hours. Best time to study is 7 PM.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    HCI lab session tomorrow. Review materials tonight.
                  </p>
                </div>
              </div>
            </div>

            {/* Ask AI Button - ACTIVE */}
            <button
              onClick={handleAskAI}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 flex items-center justify-center gap-2 active:opacity-80"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white">Ask AI</span>
            </button>
          </>
        ) : (
          <>
            {/* AI Response */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm leading-relaxed">
                  {currentSuggestion}
                </p>
              </div>
            </div>

            {/* Action Buttons - Only Add Reminder is ACTIVE */}
            <div className="space-y-2">
              <button 
                onClick={() => onBack()}
                className="w-full bg-blue-500 rounded-2xl p-4 text-white text-sm active:bg-blue-600"
              >
                Add Reminder
              </button>
              
              {/* Disabled buttons - shown but not functional */}
              <button className="w-full bg-gray-900/50 rounded-2xl p-4 text-gray-600 text-sm cursor-not-allowed">
                View Schedule
              </button>
              
              <button
                onClick={() => setShowSuggestion(false)}
                className="w-full bg-gray-800 rounded-2xl p-4 text-gray-400 text-sm active:bg-gray-700"
              >
                Dismiss
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}