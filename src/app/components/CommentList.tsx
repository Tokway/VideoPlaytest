import React from 'react';
import CommentCard from "./CommentCard";
import { VideoComment } from "../common/types";

interface CommentListProps {
    videoComments: VideoComment[];
}

const CommentList: React.FC<CommentListProps> = ({ videoComments }) => {
    return (
        <div className="comment-list space-y-4">
            {videoComments.map((videoComment) => (
                <CommentCard key={videoComment.id} comment={videoComment} />
            ))}
        </div>
    );
};

export default CommentList;
