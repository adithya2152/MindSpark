"use client";
import { useState, useEffect } from 'react';
import { Data } from '@/components/DetailsCard';
import Link from 'next/link';
import "../styles/quiz.css"
interface Quiz {
  qid: number;
  title: string;
  description: string;
  category: string;
  totalQuestions: number;
  hostID: number;
}

export default function Quiz() {
  const [details, setDetails] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/quizhandler');

        if (!response.ok) {
          throw new Error('Response not ok');
        }

        const data = await response.json();
        const mappedData = data.map((item: any) => ({
          qid: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          totalQuestions: item.total_questions,
          hostID: item.host_id,
        }));

        console.log("Mapped Data:", mappedData); 
        setDetails(mappedData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="quiz-page">
      <h1 className="quiz-page-heading">Explore Quizzes</h1>
      <div className="quiz-container">
        {details.map((detail, index) => (
            <Link key={index} href={`/quiz/${detail.qid}/${detail.title}`}>
                 <Data key={index} quiz={detail} />
            </Link>
        ))}
      </div>
    </div>
  );
}
