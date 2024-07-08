import { useEffect, useState } from "react";
import "../../../styles/questions.css";

type Props = {
    params: {
        id: number,
        type: string
    };
};

interface Question {
    question_id: number;
    quiz_id: number;
    question: string;
    options: string[];
    correct_answer: string;
}

export default function Question({ params }: Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/questionhandler/${params.id}`);
                if (!response.ok) {
                    throw new Error('Error Fetching Questions');
                }
                const data = await response.json();

                const mappedQuestions: Question[] = data.map((item: any) => ({
                    question_id: item.id,
                    quiz_id: item.quiz_id,
                    question: item.question,
                    options: item.options || [],
                    correct_answer: item.correct_answer
                }));

                setQuestions(mappedQuestions);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [params.id]);

    const handleOptionChange = (questionId: number, option: string) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: option
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let count = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.question_id] === question.correct_answer) {
                count++;
            }
        });
        const maxScore = questions.length;
        const score = count;
        const percentage = (count / maxScore) * 100;
        setScore(score);
        setPercentage(percentage);

        setSubmitted(true);

        try {
            const quiz_id = params.id
            const response = await fetch("http://localhost:3000/answerhandler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quiz_id, maxScore, score })
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                alert("Scores Saved");
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage('An error occurred. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    // Decode the quiz title before displaying
    const decodedQuizTitle = decodeURIComponent(params.type);

    return (
        <div className="quiz-container">
            <div className="score-container">
                <h2>Quiz Title: {decodedQuizTitle}</h2>
                <div className="score">
                    <p>Total Score: {score}</p>
                    <p>Score: {percentage.toFixed(2)}%</p>
                    <p>Max Score: {questions.length}</p>
                </div>
            </div>
            <div className="question-list">
                {questions.map((ques, index) => (
                    <div key={index} className={`question-item ${submitted ? (selectedAnswers[ques.question_id] === ques.correct_answer ? 'correct' : 'incorrect') : ''}`}>
                        <h3 className="question-text">{ques.question}</h3>
                        {ques.options.map((opt, optIndex) => (
                            <div key={optIndex} className="option">
                                <input
                                    type="radio"
                                    name={`question-${ques.question_id}`}
                                    id={`question-${ques.question_id}-option-${optIndex}`}
                                    value={opt}
                                    checked={selectedAnswers[ques.question_id] === opt}
                                    onChange={() => handleOptionChange(ques.question_id, opt)}
                                    disabled={submitted} // Disable inputs after submission
                                />
                                <label htmlFor={`question-${ques.question_id}-option-${optIndex}`} className="option-label">{opt}</label>
                            </div>
                        ))}
                        {submitted && selectedAnswers[ques.question_id] !== ques.correct_answer && (
                            <div className="correct-answer">
                                Correct Answer: {ques.correct_answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!submitted && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit Answers
                </button>
            )}
            {submitted && (
                <div className="submitted-message">
                    Thank you for submitting your answers!
                </div>
            )}
        </div>
    );
}
