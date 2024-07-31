import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './Navbar';
import Home from './Home';
import Optimizer from './Optimizer';
import Tutorials from './Tutorials';
import Footer from './Footer';
import './App.css';

function App() {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [topicProgress, setTopicProgress] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/questions')
            .then(response => {
                setTopics(response.data);
                updateCounts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const updateCounts = (topics) => {
        const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
        const completedQuestions = topics.reduce((acc, topic) =>
            acc + topic.questions.filter(q => q.Done).length, 0);

        setTotalCount(totalQuestions);
        setCompletedCount(completedQuestions);

        const progress = topics.map(topic => {
            const total = topic.questions.length;
            const completed = topic.questions.filter(q => q.Done).length;
            return {
                topicName: topic.topicName,
                completed,
                total,
                percentage: total === 0 ? 0 : (completed / total) * 100,
            };
        });

        setTopicProgress(progress);
    };

    const updateBookmark = (topicIndex, questionIndex) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].questions[questionIndex].bookmarked = !updatedTopics[topicIndex].questions[questionIndex].bookmarked;
        setTopics(updatedTopics);
    };

    const markAsDone = (topicIndex, questionIndex) => {
        const updatedTopics = [...topics];
        updatedTopics[topicIndex].questions[questionIndex].Done = !updatedTopics[topicIndex].questions[questionIndex].Done;
        setTopics(updatedTopics);
        updateCounts(updatedTopics);
    };

    return (
        <Router>
            <div className="app-container">
                <AppNavbar
                    topics={topics}
                    selectTopic={setSelectedTopic}
                    completedCount={completedCount}
                    totalCount={totalCount}
                />
                <div className="content-wrap">
                    <Routes>
                        <Route exact path="/" element={<Home
                            topics={topics}
                            selectedTopic={selectedTopic}
                            completedCount={completedCount}
                            totalCount={totalCount}
                            topicProgress={topicProgress}
                            updateBookmark={updateBookmark}
                            markAsDone={markAsDone}
                        />} />
                        <Route exact path="/optimizer" element={<Optimizer />} />
                        <Route exact path="/tutorials" element={<Tutorials />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

