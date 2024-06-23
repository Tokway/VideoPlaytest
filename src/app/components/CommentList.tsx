import React from 'react';
import CommentComponent from "./CommentCard";
import { VideoComment } from "../common/types";


interface CommentListProps {
    videoComments: VideoComment[];
}

const CommentList: React.FC<CommentListProps> = ({ videoComments }) => {
    return (
        <div className="comment-list">
            {videoComments.map(videoComment => (
                <CommentComponent key={videoComment.id} comment={videoComment} />
            ))}
        </div>
    );
};

export default CommentList;