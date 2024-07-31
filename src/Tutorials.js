import React, { useState } from 'react';
import { fetchTutorialVideos } from './ytapi.js';
import Header from './Header.js';

const TopicsSelection = () => {
    const topics = [
        'Array', 'Matrix', 'String', 'Search & Sort', 'Linked List',
        'Binary Trees', 'BST', 'Greedy', 'BackTracking', 'Stacks & Queues',
        'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation',
    ];

    const [selectedTopic, setSelectedTopic] = useState('');
    const [videos, setVideos] = useState([]);
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    const handleSearch = async () => {
        try {
            const fetchedVideos = await fetchTutorialVideos(selectedTopic);
            setVideos(fetchedVideos);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handlePlayVideo = (videoId) => {
        setPlayingVideoId(videoId);
    };

    return (
        <div>
            <Header
                title="Video Tutorials"
                description="Explore a variety of coding tutorials to enhance your skills. Learn from experts and improve your proficiency in different programming languages."
                imageUrl="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-8392.jpg"
            />
            <div className="container py-5">
                <h2 className="text-center mb-4">EXPLORE TOPICS</h2>
                <div className="search-container">
                    <div className="search-dropdown">
                        <select value={selectedTopic} onChange={(e) => handleTopicSelection(e.target.value)}>
                            <option value="">Select Topic</option>
                            {topics.map((topic) => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                        <button className="search-btn" onClick={handleSearch}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                {videos.length > 0 && (
                    <div className="mt-5">
                        <div className="row justify-content-center">
                            {videos.map((video) => (
                                <div key={video.id} className="col-md-4 mb-3">
                                    <div className="video-card">
                                        {playingVideoId === video.id ? (
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe
                                                    className="embed-responsive-item"
                                                    src={`https://www.youtube.com/embed/${video.id}`}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        ) : (
                                            <>
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                                    alt={video.title}
                                                />
                                                <div
                                                    className="play-button"
                                                    onClick={() => handlePlayVideo(video.id)}
                                                >
                                                    ▶
                                                </div>
                                                <div className="content">
                                                    <h3>{video.title}</h3>
                                                    <p>{video.description.substring(0, 30)}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicsSelection;

