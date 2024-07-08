"use client"
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Host.css';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const Host: React.FC = () => {
    const router = useRouter();
    const [totalQuestions, setTotalQuestions] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('general');

    const handleTotalQuestionsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setTotalQuestions(value);

        const newQuestions: Question[] = [];
        for (let i = 0; i < value; i++) {
            newQuestions.push({
                question: '',
                options: ['', '', '', ''],
                correctAnswer: ''
            });
        }
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const newQuestions = [...questions];
        if (field === 'question') {
            newQuestions[index].question = value;
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.split('-')[1]);
            newQuestions[index].options[optionIndex] = value;
        } else if (field === 'correctAnswer') {
            newQuestions[index].correctAnswer = value;
        }
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/hosthandler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    questions,
                    totalQuestions,
                }),
            });

            if (response.ok) {
                router.push('/home'); 
                alert("Hosted successfully");
            }
            else if(response.status === 401)
                {
                    router.push("/login")
                    alert("user not logged in")
                } 
            else {
                console.error('Failed to host project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="host-form-container">
            <form onSubmit={handleSubmit} className="host-form">
                <h1>Host a Project</h1>
                <label htmlFor="title">Title</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title"
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name="description"
                    rows={10}
                    placeholder="Description"
                ></textarea>

                <label htmlFor="category">Category</label>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    name="category"
                >
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="general">General</option>
                </select>

                <label htmlFor="totalQuestions">Total Questions</label>
                <input
                    type="number"
                    name="totalQuestions"
                    placeholder="Total Questions"
                    value={totalQuestions}
                    onChange={handleTotalQuestionsChange}
                />

                {questions.map((question, index) => (
                    <div key={index} className="question-section">
                        <label htmlFor={`question-${index}`}>Question {index + 1}</label>
                        <input
                            type="text"
                            name={`question-${index}`}
                            placeholder={`Question ${index + 1}`}
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        />

                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="option-section">
                                <label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</label>
                                <input
                                    type="text"
                                    name={`option-${index}-${optionIndex}`}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => handleQuestionChange(index, `option-${optionIndex}`, e.target.value)}
                                />
                            </div>
                        ))}

                        <label htmlFor={`correctAnswer-${index}`}>Correct Answer</label>
                        <input
                            type="text"
                            name={`correctAnswer-${index}`}
                            placeholder="Correct Answer"
                            value={question.correctAnswer}
                            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                        />
                    </div>
                ))}

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Host;
