'use client';

import VideoPlayer from '../../components/VideoPlayer';
import React, { useEffect, useRef, useState } from 'react';
import videojs from "video.js";
import { getUserVideos, getVideoComments } from "../../common/api";
import VideoCard from "../../components/VideoCard";
import { Video, VideoComment } from "../../common/types";
import CommentList from "../../components/CommentList";
import AddComment from "../../components/AddComment";
import { USER_ID } from "../../common/fakeauth";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { extractInitials, generatePastelColorFromLetters, timeAgo } from "../../common/util";
import Player from "video.js/dist/types/player";

export default function Page({ params }: { params: { id: string } }) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [videoComments, setVideoComments] = useState<VideoComment[]>([]);
    let initials = "";
    let backgroundColor = "";
    if(currentVideo && currentVideo.user_id){
        initials = extractInitials(currentVideo?.user_id as string);
        backgroundColor = generatePastelColorFromLetters(initials);
    }

    const playerRef = useRef<Player|null>(null);

    const videoJsOptions: any  = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: currentVideo?.video_url,
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player: Player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    const handleCommentAdded = async () => {
        const videoComments = await getVideoComments(params.id);
        setVideoComments(videoComments);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userVideos = await getUserVideos(USER_ID);
                setVideos(userVideos);
                const selectedVideo = userVideos.find(video => video.id === params.id);
                setCurrentVideo(selectedVideo || null);
                let videoComments: VideoComment[]
                if (selectedVideo){
                    videoComments = await getVideoComments(selectedVideo.id);
                    setVideoComments(videoComments);
                }
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            }
        }

        void fetchData();
    }, [params.id]);


    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 mb-4">
            <div className="lg:col-span-3">
                {currentVideo && (
                    <div>
                        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady}/>
                        <h1 className="text-2xl font-bold mt-4">{currentVideo.title}</h1>
                        <div>
                            <div className="flex items-center mt-2">
                                <div
                                    className="w-6 h-6 font-light text-xs rounded-full flex items-center justify-center"
                                    style={{ backgroundColor }}
                                >
                                    <span className="text-white font-bold">{initials}</span>
                                </div>
                                <p className="ml-2">{currentVideo.user_id} · Uploaded {new Date(currentVideo.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500 mr-1"/>
                                <p className="text-gray-500"><span className="ml-2">{videoComments.length} comments</span></p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="space-y-4 mt-4">
                    <h2 className="text-lg font-bold">Comments · {videoComments.length}</h2>
                    <AddComment videoId={currentVideo?.id!} onCommentAdded={handleCommentAdded}/>
                    <CommentList videoComments={videoComments}/>
                </div>
            </div>
            <div className="lg:col-span-1">
                <h2 className="text-xl font-bold mb-4">Other Videos</h2>
                <div className="space-y-4">
                    {videos.map(video => (
                        <VideoCard key={video.id} video={video}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
