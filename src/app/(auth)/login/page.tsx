"use client"

import {useState} from "react"
import Link from "next/link";
import React from 'react';
import styles from './Login.module.css';

export default function Login() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [message , setMessage] = useState("");

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/loginHandler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
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
                <h2>Login</h2>
                <form action="/loginHandler" method="POST">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username"  value={username} onChange={(e)=>setUsername(e.target.value)} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

                    <button onClick={handleSubmit} type="submit">Login</button>
                </form>
                <div className={styles.flex}>
                <p>New User ?</p>
                <Link href="/register">Register</Link>

                </div>
                {message && <p>{message}</p>}

            </div>
        </div>
    );
}
