"use client"
import { useState, useEffect } from "react"; 
import Card from "@/components/Card";
import Link from "next/link";
import styles from "../UserHistory.module.css"

interface History {
    title: string;
}

export default function HostHistoryComponent() {
    const [title, setTitle] = useState<History[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await fetch('http://localhost:3000/home/historyhandler');
                if (!response.ok) {
                    throw new Error('Error Fetching title');
                }
                const data: History[] = await response.json();
                console.log(data);
                setTitle(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                console.log(err);
            }
        };
        fetchTitle();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card> 
            <div className={styles.history}>
                <h2>Recent hosting</h2>
                <ul>
                    {title.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>

                <Link href="/home"> Recent Participation</Link>
            </div>
        </Card>
    );
}
