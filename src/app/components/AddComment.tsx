import React, { useState } from 'react';
import { createComment } from '../common/api';
import { USER_ID } from "../common/fakeauth";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface AddCommentProps {
    videoId: string;
    onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ videoId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        console.log("comment submit")
        event.preventDefault();

        try {
            void await createComment({ video_id: videoId, user_id: USER_ID, content });
            onCommentAdded();
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4 ">
            <div className="relative flex items-center flex-grow">
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500 absolute left-3" />
                <input
                    value={content}
                    placeholder="Your comment."
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Comment
            </button>
        </form>
    );
};

export default AddComment;
