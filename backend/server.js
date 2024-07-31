const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dsa-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const questionSchema = new mongoose.Schema({
    topicName: String,
    position: Number,
    started: Boolean,
    doneQuestions: Number,
    questions: [
        {
            Topic: String,
            Problem: String,
            Done: Boolean,
            Bookmark: Boolean,
            Notes: String,
            URL: String,
            URL2: String
        }
    ]
});

const Question = mongoose.model('Question', questionSchema);

app.get('/questions', async (req, res) => {
    const questions = await Question.find();
    res.send(questions);
});

app.post('/questions',
    [
        body('topicName').isString(),
        body('position').isNumeric(),
        body('started').isBoolean(),
        body('doneQuestions').isNumeric(),
        body('questions').isArray()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const question = new Question(req.body);
            await question.save();
            res.send(question);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});