import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    options: videojs.PlayerOptions;
    onReady?: (player: videojs.Player) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady }) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered');
            videoElement.classList.add('w-full'); // Tailwind CSS class for responsive width

            if (videoRef.current) {
                videoRef.current.appendChild(videoElement);
            }

            const player = (playerRef.current = videojs(videoElement, options, () => {
                videojs.log('Player is ready');
                if (onReady) {
                    onReady(player);
                }
            }));
        } else {
            const player = playerRef.current;
            if (player) {
                player.autoplay(options.autoplay || false);
                player.src(options.sources || []);
            }
        }
    }, [options, onReady]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div data-vjs-player className="flex justify-center items-center w-full h-full">
            <div ref={videoRef} className="w-full h-full max-w-screen-lg" />
        </div>
    );
};

export default VideoPlayer;
