import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button';
import Card from '../ui/Card';
import FileUpload from './FileUpload';
import QuestionAccordion from './QuestionAccordion';
import { BookIcon, LogoutIcon } from '../icons/Icons';

const OrganizerScreen = ({ onLogout }) => {
  const [files, setFiles] = useState([]);
  const [syllabus, setSyllabus] = useState('');
  const [organizedQuestions, setOrganizedQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (files.length === 0 || !syllabus) {
      setError('Please provide the syllabus and at least one PDF file.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setOrganizedQuestions(null);

    const formData = new FormData();
    formData.append('syllabus', syllabus);
    for (let i = 0; i < files.length; i++) {
      formData.append('pyqs', files[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/organize', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}` 
        },
      });
      setOrganizedQuestions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while organizing the questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setSyllabus('');
    setOrganizedQuestions(null);
    setError('');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">Q</span>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PYQ Organizer
            </h1>
          </div>
          
          <Button
            variant="ghost"
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogoutIcon className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Organize Your Question Papers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upload your PDF question papers and syllabus to get AI-organized questions by units
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700/50">
          <Card.Content className="p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Syllabus Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-200 mb-6">
                  <BookIcon className="w-5 h-5 text-purple-400 mr-3" />
                  Course Syllabus
                </label>
                <textarea
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  placeholder="e.g., Unit 1: Thermodynamics&#10;Unit 2: Optics&#10;Unit 3: Quantum Mechanics"
                  required
                  className="w-full h-36 px-5 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                <p className="text-sm text-gray-400 mt-3">
                  List your course units to help organize questions effectively
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-6">
                  Question Paper PDFs
                </label>
                <FileUpload files={files} onFilesChange={setFiles} />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-6 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  disabled={files.length === 0 || !syllabus}
                  className="flex-1"
                >
                  {isLoading ? 'Organizing Questions...' : 'Organize Questions'}
                </Button>
                
                {(files.length > 0 || syllabus || organizedQuestions) && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </Card.Content>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8 bg-gray-800/50 border-gray-700/50">
            <Card.Content className="p-16 text-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-10 h-10 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
                <div>
                  <h3 className="text-xl font-medium text-white">Processing your files...</h3>
                  <p className="text-gray-400 mt-2 text-lg">This may take a few moments</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Card className="mb-8 bg-red-900/20 border-red-500/30">
            <Card.Content className="p-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-lg font-medium">!</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-red-300">Error</h3>
                  <p className="text-base text-red-400 mt-1">{error}</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Results Section */}
        {organizedQuestions && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-3">
                Organized Questions
              </h2>
              <p className="text-xl text-gray-300">
                Questions organized by syllabus units
              </p>
            </div>
            
            <div className="space-y-6">
              {Object.entries(organizedQuestions).map(([unit, questions]) => (
                <QuestionAccordion key={unit} unit={unit} questions={questions} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizerScreen;
