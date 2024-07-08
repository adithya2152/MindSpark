"use client"
import { useState } from 'react';
import React from 'react';
import styles from './Register.module.css';
import { useRouter } from "next/navigation";

import Link from 'next/link';
export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router  = useRouter();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/registerhandler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password ,email}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                router.push("/home")

            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
                <div className={styles.flex}>
                <p>Already Registered ?</p>
                <Link href="/login">Login</Link>

                </div>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
