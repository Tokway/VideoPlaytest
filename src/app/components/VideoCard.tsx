import React from 'react';
import { Video } from "../common/types";
import Link from "next/link";
import Image from 'next/image';
import { extractInitials, generatePastelColorFromLetters, getRandomInt, timeAgo } from "../common/util";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

export interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const randId = getRandomInt(1, 50);
    const initials = extractInitials(video.user_id);
    const backgroundColor = generatePastelColorFromLetters(initials);

    return (
        <Link href={`/videos/${video.id}`} passHref>
            <div className="p-4 mb-4">
                <div className="relative p-4 bg-white rounded-lg transition-shadow duration-300 hover:shadow-xl">
                    <Image
                        src={`https://picsum.photos/id/${randId}/300/172`}
                        width={300}
                        height={172}
                        alt={video.title}
                        className="w-full rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-bold mt-2 truncate">{video.title}</h2>
                        <div className="flex items-center mt-2">
                            <div
                                className="w-8 h-8 font-light text-xs rounded-full flex items-center justify-center"
                                style={{ backgroundColor }}
                            >
                                <span className="text-white font-bold">{initials}</span>
                            </div>
                            <p className="ml-2 text-sm text-gray-600">{video.user_id} · {timeAgo(new Date(video.created_at))}</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-500 mr-1" />
                            <p className="text-gray-500 text-sm"><span className="ml-2">{video.num_comments}</span></p>
                        </div>
                    </div>
                    <div className="absolute inset-0 border border-transparent rounded-lg hover:border-gray-200"></div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
