import { VideoComment, Video} from "./types"

const BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api';

export async function getUserVideos(userId: string): Promise<Video[]> {
    const response = await fetch(`${BASE_URL}/videos?user_id=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return  (await response.json())["videos"];
}

export async function getSingleVideo(videoId: string): Promise<Video> {
    const response = await fetch(`${BASE_URL}/videos/single?video_id=${videoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch video');
    }
    return (await response.json())["video"];
}

export async function createVideo(video: Omit<Video, 'id' | 'created_at' | 'num_comments'>): Promise<Video> {
    const response = await fetch(`${BASE_URL}/videos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(video)
    });
    if (!response.ok) {
        throw new Error('Failed to create video');
    }
    return await response.json();
}

export async function editVideo(video: Omit<Video, 'created_at' | 'num_comments'>): Promise<Video> {
    const response = await fetch(`${BASE_URL}/videos`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(video)
    });
    if (!response.ok) {
        throw new Error('Failed to edit video');
    }
    return await response.json();
}

export async function getVideoComments(videoId: string): Promise<VideoComment[]> {
    const response = await fetch(`${BASE_URL}/videos/comments?video_id=${videoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return (await response.json())["comments"];
}

export async function createComment(comment: Omit<VideoComment, 'id' | 'created_at'>): Promise<VideoComment> {
    const response = await fetch(`${BASE_URL}/videos/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    if (!response.ok) {
        throw new Error('Failed to create comment');
    }
    return await response.json();
}
