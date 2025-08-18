import React, { useState } from 'react';
import { UploadIcon, FileIcon, CloseIcon } from '../icons/Icons';

const FileUpload = ({ files, onFilesChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    onFilesChange([...files, ...event.target.files]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = [...e.dataTransfer.files];
    onFilesChange([...files, ...droppedFiles]);
  };

  const removeFile = (fileIndex) => {
    onFilesChange(files.filter((_, index) => index !== fileIndex));
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${
          isDragging 
            ? 'border-purple-400 bg-purple-900/20' 
            : 'border-gray-600/50 hover:border-gray-500/50'
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-500/20' : 'bg-gray-700/50'}`}>
            <UploadIcon className={`w-8 h-8 ${isDragging ? 'text-purple-400' : 'text-gray-400'}`} />
          </div>
          
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-xl font-medium text-white">
                Drop your PDF files here
              </span>
              <p className="text-gray-300 mt-2 text-base">
                or <span className="text-purple-400 hover:text-purple-300 font-medium">browse files</span>
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
          
          <p className="text-sm text-gray-400">
            Support for PDF files up to 10MB each
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-200">
            Selected Files ({files.length})
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {Array.from(files).map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700/30 p-4 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileIcon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
