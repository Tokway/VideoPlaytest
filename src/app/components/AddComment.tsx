import React, { useState } from 'react';
import { createComment } from '../common/api';
import { USER_ID } from "../common/fakeauth";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface AddCommentProps {
    videoId: string;
    onCommentAdded: () => void;
}

interface Comment {
    video_id: string;
    user_id: string;
    content: string;
}

const AddComment: React.FC<AddCommentProps> = ({ videoId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const comment: Comment = { video_id: videoId, user_id: USER_ID, content };
            await createComment(comment);
            onCommentAdded();
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Failed to add comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <div className="relative flex items-center flex-grow">
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500 absolute left-3" />
                <input
                    value={content}
                    placeholder="Your comment."
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full sm:text-sm"
                    disabled={loading}
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={loading}
            >
                {loading ? 'Commenting...' : 'Comment'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};

export default AddComment;
