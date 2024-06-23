import React from 'react';
import { VideoComment } from '../common/types'
import { extractInitials, generatePastelColorFromLetters } from "../common/util";

export interface CommentCardProps {
    comment: VideoComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    const initials = extractInitials(comment.user_id);
    const backgroundColor = generatePastelColorFromLetters(initials);

    return (
        <div className="relative p-4 mb-4 bg-white">
            <div className="flex items-center mb-2">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor }}
                >
                    <span className="text-white font-bold">{initials}</span>
                </div>
                <div className="ml-3">
                    <span className="font-semibold">{comment.user_id}</span>
                    <span className="text-gray-500 ml-2 text-sm">
                        {new Date(comment.created_at ?? Date.now()).toLocaleString()}
                    </span>
                </div>
            </div>
            <div className="ml-10 p-2 px-5 comment-content text-gray-700 bg-gray-200 inline-block rounded-full rounded-tl-sm ">
                {comment.content}
            </div>
        </div>
    );
};

export default CommentCard;