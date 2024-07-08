// pages/contact.tsx

import Header from '@/components/Header';
import React from 'react';
import Head from 'next/head';
import styles from "./contact.module.css";

const ContactPage: React.FC = () => {
    return (
        <>
           <Header />
        <div className={styles.container}>
            <Head>
                <title>Contact Us - Your Website Name</title>
                <meta name="description" content="Contact us for any inquiries or feedback." />
            </Head>
            <div className={styles.content}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.description}>
                    Feel free to reach out to us via email at <a href="mailto:contact@example.com" className={styles.link}>contact@example.com</a>.
                </p>
                <p className={styles.description}>
                    You can also visit our office at:
                    <br />
                    123 Main Street, Cityville, Country
                </p>
            </div>
        </div>
        </>
         
    );
};

export default ContactPage;
