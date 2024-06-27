import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LinkIcon, VideoCameraIcon } from "@heroicons/react/20/solid";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (title: string, videoUrl: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    onUpload(title, videoUrl);
    setTitle('');
    setVideoUrl('');
    onClose();
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter') {
        handleSubmit();
      }
    },
    [onClose, handleSubmit]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, onClose, handleKeyPress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload Video</h2>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Name your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="pl-10 w-full border border-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <VideoCameraIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="https://your-video-link.com"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="pl-10 w-full border border-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border rounded-full bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-emerald-500 font-bold text-white hover:bg-emerald-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
