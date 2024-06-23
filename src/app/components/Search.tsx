
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const Search = () => {
    return (
        <div className="relative">
            <input
                type="text"
                className="pl-10 pr-3 py-2 border rounded-full w-full"
                placeholder="Search videos..."
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
        </div>
    );
};

export default Search;
