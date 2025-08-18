import React, { useState } from 'react';
import { ChevronDownIcon } from '../icons/Icons';

const QuestionAccordion = ({ unit, questions }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 hover:bg-gray-700/30 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-white text-left">{unit}</h3>
          <span className="bg-purple-500/20 text-purple-300 text-sm font-medium px-3 py-1.5 rounded-full">
            {questions.length} questions
          </span>
        </div>
        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {isOpen && (
        <div className="px-8 pb-8">
          <div className="border-t border-gray-700/50 pt-6">
            {questions.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full flex items-center justify-center mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-200 text-base leading-relaxed break-words">{question}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-6 italic text-base">
                No questions found for this unit
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAccordion;
