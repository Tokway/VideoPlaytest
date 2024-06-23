'use client'

import Link from 'next/link';
import Image from 'next/image'
import { useState } from "react";
import UploadModal from './UploadModal';
import Search from "./Search";
import { createVideo } from "../common/api";
import { Video} from "../common/types";
import { USER_ID } from "../common/fakeauth";

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpload = async (title: string, videoUrl: string) => {
        try {
            let newVideo = {
                title: title,
                video_url: videoUrl,
                user_id: USER_ID,
                description: ""
            } as Video

            await createVideo(newVideo);
            console.log('Video uploaded successfully');
        } catch (error) {
            console.error('Failed to upload video:', error);
        }
    };


    return (
        <nav className="p-4 fixed top-0 w-full z-50 bg-white">
            <div className="container mx-auto flex justify-between items-center">
                <Search />
                <div>
                    <Link href="/"><Image src="/images/FULL_LOGO_COLOR.png" alt="LearnWell Logo" width={157.5} height={43.5} priority={true} /></Link>
                </div>
                <div className="space-x-4 flex items-center  ">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded-full bg-blue-500 font-bold text-white"
                    >
                        Upload
                    </button>
                </div>
            </div>
            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUpload}
            />
        </nav>
    );
};

export default NavBar;
