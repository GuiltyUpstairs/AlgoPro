import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "./Header";
const CodeOptimizer = () => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [complexity, setComplexity] = useState("");
    const [optimizing, setOptimizing] = useState(false);
    const [optimizedCode, setOptimizedCode] = useState("");

    async function optimizeCode(e) {
        e.preventDefault();
        setOptimizing(true);
        setOptimizedCode("Optimizing your code... \n It might take up to 10 seconds");

        const prompt = `Optimize the ${language} code to reduce ${complexity} complexity: ${code}.
    The format of this output should be :

    TOPIC:CODE TOPIC

    OPTIMIZED CODE:Optimized Code 

    EXPLANATION:Explanation

    TIPS AND TRICKS:Tips and tricks

    don't add redundant symbols like ** **
    `;

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC8cCBbbLewK6FysOfhiynH2F4P_MVToaA`,
                method: "post",
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                },
            });
            console.log(response)
            setOptimizedCode(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.log(error);
            setOptimizedCode("Sorry - Something went wrong. Please try again!");
        }

        setOptimizing(false);
    }

    return (
        <div>
            <Header
                title="Code Optimizer"
                description="Optimize your code to improve performance and efficiency. Reduce complexity and enhance readability with our powerful optimization tools."
                imageUrl="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-8392.jpg"
            />

            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <form onSubmit={optimizeCode}>
                            <div className="mb-3">
                                <label htmlFor="language" className="form-label">Choose a language:</label>
                                <select
                                    id="language"
                                    className="form-select"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="">Select a language</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="C">C</option>
                                    <option value="C#">C#</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="PHP">PHP</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="complexity" className="form-label">Choose complexity:</label>
                                <select
                                    id="complexity"
                                    className="form-select"
                                    value={complexity}
                                    onChange={(e) => setComplexity(e.target.value)}
                                >
                                    <option value="">Select complexity</option>
                                    <option value="time">Time</option>
                                    <option value="space">Space</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="code" className="form-label">Paste your code here:</label>
                                <textarea
                                    required
                                    className="form-control"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter your code here"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={`btn btn-${optimizing ? 'secondary' : 'primary'} w-100`}
                                disabled={optimizing}
                            >
                                {optimizing ? 'Optimizing...' : 'Optimize Code'}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <div className="bg-dark p-4 rounded">
                            <ReactMarkdown className="text-white markdown-output">{optimizedCode}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOptimizer;