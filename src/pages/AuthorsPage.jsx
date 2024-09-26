import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/authorDetailsbtn.css"


const AuthorsPage = () => {
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState('');

    // Fetch authors from the API
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('https://book-store-backend-sigma-one.vercel.app/author');
                setAuthors(response.data);
                setFilteredAuthors(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching authors', error);
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    // Function to handle letter click and filter authors
    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
        const filtered = authors.filter((author) =>
            author.name.toLowerCase().startsWith(letter.toLowerCase())
        );
        setFilteredAuthors(filtered);
    };

    // Function to reset the filter
    const handleResetClick = () => {
        setSelectedLetter('');
        setFilteredAuthors(authors);
    };

    if (loading) {
        return <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
            <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="authors-page container mx-auto my-6 px-4 sm:px-6 lg:px-8">

            {/* Letter row */}
            <div className="flex justify-center mb-6 flex-wrap">
                <button
                    onClick={handleResetClick}
                    className={`px-3 py-2 mx-1 mb-2 rounded-full ${selectedLetter === '' ? 'bg-yellow-600 text-white' : 'bg-gray-200'} hover:bg-yellow-400 transition`}
                >
                    All
                </button>
                {letters.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        className={`px-3 py-2 mx-1 mb-2 rounded-full ${selectedLetter === letter ? 'bg-yellow-600 text-white' : 'bg-gray-200'} hover:bg-yellow-400 transition`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Author Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredAuthors.length > 0 ? (
                    filteredAuthors.map((author) => (
                        <div key={author._id} className="text-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
                                <img
                                    src={author.image}
                                    alt={author.name}
                                    className="w-full h-full object-cover rounded-full shadow-lg"
                                />
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold">{author.name}</h2>
                            <p className="text-gray-600 text-sm sm:text-base">
                                {author.books.length > 0
                                    ? `${author.books.length} Published Books`
                                    : 'No Published Books Yet'}
                            </p>
                            <Link
                                to={`/authors/${author._id}`}
                            >
                                <button  className="button" data-text="">
                                <span  className="actual-text">&nbsp;ViewBooks&nbsp;</span>
                                <span aria-hidden="true" className="hover-text ">&nbsp;ViewBooks&nbsp;</span>
                            </button>
                            </Link>
                    
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600">No authors found</div>
                )}
            </div>
        </div>
    );
};

export default AuthorsPage;
