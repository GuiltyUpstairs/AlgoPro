import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Header from './Header';

function Home({ topics, selectedTopic, completedCount, totalCount, topicProgress, updateBookmark, markAsDone }) {
    const percentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    return (
        <div>
            <Header
                title="AlgoPro"
                description="Track your progress in mastering Data Structures and Algorithms. Keep up with your practice and stay ahead in your coding journey."
                imageUrl="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-8392.jpg"
            />
            <div className="container">

                <div className='trackers'>
                    <div className="count-tracker">
                        <CircularProgressbar
                            value={percentage}
                            text={`${completedCount}/${totalCount}`}
                            styles={buildStyles({
                                textColor: "#fff",
                                pathColor: "#0ff",
                                trailColor: "#333",
                                backgroundColor: "#000",
                            })}
                        />
                    </div>
                    <div className="topic-progress-section">
                        <h3>Progress Tracker</h3>
                        {topics.length > 0 && (
                            <div className="topic-progress">
                                <h4>{topics[selectedTopic].topicName}</h4>
                                <p>Completed: {topicProgress[selectedTopic]?.completed}/{topicProgress[selectedTopic]?.total}</p>
                                <CircularProgressbar
                                    value={topicProgress[selectedTopic]?.percentage || 0}
                                    text={`${topicProgress[selectedTopic]?.completed}/${topicProgress[selectedTopic]?.total}`}
                                    styles={buildStyles({
                                        textColor: "#fff",
                                        pathColor: "#0f0",
                                        trailColor: "#333",
                                        backgroundColor: "#000",
                                    })}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {topics.length > 0 && (
                    <div className="topic-section glassmorphism">
                        <h2>{topics[selectedTopic].topicName}</h2>
                        {topics[selectedTopic].questions.map((question, qIndex) => (
                            <div className="question-row row glassmorphism hover-animation" key={qIndex}>
                                <div className="col-md-4 question-text">{question.Problem}</div>
                                <div className="col-md-2">
                                    <button
                                        className={`btn ${question.bookmarked ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => updateBookmark(selectedTopic, qIndex)}
                                    >
                                        <FontAwesomeIcon icon={question.bookmarked ? solidBookmark : regularBookmark} />
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <a href={question.URL} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHB7PYl9XdL_yBuahZCWur6I079QQrREUYxKdEGB8gcyDRCyhhndMRt4B7qLgs9MMC74k&usqp=CAU" alt="Icon 1" className="icon"/>
                                    </a>
                                    <a href={question.URL2} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtZNvI2XYsUWK-z5YmQQS1obRIVrTLjoFKWI2dmbIN8Tmdapaw48OYrXjHuZg20LpdBtQ&usqp=CAU" alt="Icon 2" className="icon"/>
                                    </a>
                                </div>
                                <div className="col-md-1">
                                    <button
                                        className={`btn ${question.Done ? 'btn-success' : 'btn-warning'}`}
                                        onClick={() => markAsDone(selectedTopic, qIndex)}
                                    >
                                        {question.Done ? 'Unmark' : 'Mark as Done'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;