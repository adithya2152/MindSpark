"use client"
import { useState , useEffect } from "react"; 
import Card from "@/components/Card";
import styles from "../@topUsers/TopUsers.module.css"


interface user{
    username:string;
}
export default function Topusers() {
    const [users ,setUsers] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/home/topcontributor');
                if (!response.ok) {
                    throw new Error('Error Fetching users');
                }
                const data = await response.json();
                console.log(data);
                setUsers(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <Card> 
            <div className={styles.topusers}>
                <h2>Top Contributors</h2>
                <ul>
                    {users.map((user, index) => (
                            <li key={index}>{user.username}</li> // Render the username property
                        ))}
                </ul>
            </div>
        </Card>
    );
}
