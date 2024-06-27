import { useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { searchVideos } from '../common/api';
import { Video } from '../common/types';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Video[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            const videos = await searchVideos(query);
            setResults(videos);
        } catch (error) {
            setError('Failed to search videos');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <input
                    type="text"
                    className="pl-10 pr-3 py-2 border rounded-full w-full focus:outline-none focus:ring focus:border-emerald-500"
                    placeholder="Search videos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 left-3 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4">
                {results.map((video) => (
                    <div key={video.id} className="p-2 border-b">
                        <p className="font-semibold">{video.title}</p>
                        <p className="text-gray-500 text-sm">{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
