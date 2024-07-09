"use client"
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import styles from "../@main/Main.module.css";

interface Count {
    hosted_count: number;
    hosted_response: number;
    participated: number;
}

export default function Main() {
    const [count, setCount] = useState<Count | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/home/counthandler');  
                if (response.ok) {
                    const data = await response.json();
                    setCount(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <Card>
            <div className={styles.main}>
                <h2>Welcome to MindSpark</h2>
                <p>Your ultimate platform for quizzes. Explore, participate, and host quizzes to challenge your knowledge and skills.</p>
                <div className={styles.links}>
                    <Link className={styles.button} href="/quiz">Attend a Quiz</Link>
                    <Link className={styles.button} href="/host">Host a Quiz</Link>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <h3>Hosted Quizzes</h3>
                        <p>{count ? count.hosted_count : 'Loading...'}</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Hosted Quiz Participants</h3>
                        <p>{count ? count.hosted_response : 'Loading...'}</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Completed Quizzes</h3>
                        <p>{count ? count.participated : 'Loading...'}</p>
                    </div>
                </div>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <h3>Interactive UI</h3>
                        <p>Engage with our visually appealing and easy-to-use interface.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Real-Time Updates</h3>
                        <p>Stay updated with the latest quizzes and participant statistics.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Comprehensive Analytics</h3>
                        <p>Analyze your quiz performance with detailed statistics.</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
