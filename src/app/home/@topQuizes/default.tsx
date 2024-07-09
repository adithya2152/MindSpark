"use client"
import { useState , useEffect } from "react"; 
import Card from "@/components/Card";
import styles from "../@topQuizes/TopQuiz.module.css"
import Link from "next/link";


interface quiz{
    id:number,
    title:string
}
export default function Topquiz() {
    const [title ,settitle] = useState<quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchtitle = async () => {
            try {
                const response = await fetch('http://localhost:3000/home/topquiz');
                if (!response.ok) {
                    throw new Error('Error Fetching title');
                }
                const data = await response.json();
                console.log("topquiz",data);
                settitle(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                console.log(err);
            }
        };
        fetchtitle();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    

    return (
        <Card> 
            <div className={styles.topquiz}>
                <h2>Top Quizzes</h2>
                <ul>
                {title.map((title, index) => (
                    <Link className="anchor" key={index} href={`/quiz/${title.id}/${title.title}`}>

                            <li >{title.title}</li>  
                    </Link>
                    
                        ))}
                </ul>
            </div>
        </Card>
    );
}
