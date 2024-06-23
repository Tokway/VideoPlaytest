export interface Video {
    id: string;
    created_at: string;
    video_url: string;
    user_id: string;
    description: string;
    title: string;
    num_comments: number;
}


export interface VideoComment {
    id: string;
    video_id: string;
    user_id: string;
    content: string;
    created_at: string;
}
