 
import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles['about-container']}>
            <h1>About MindSpark</h1>
            <p>Welcome to MindSpark, where learning meets engagement!</p>

            <section>
                <h2>Our Mission</h2>
                <p>At MindSpark, our mission is to revolutionize learning through interactive quizzes and engaging content. We believe in making education accessible, enjoyable, and effective for everyone.</p>
            </section>

            <section>
                <h2>What We Offer</h2>
                <ul>
                    <li><strong>Interactive Quizzes:</strong> Dive into a world of knowledge with our interactive quizzes designed to challenge and inspire.</li>
                    <li><strong>Engaging Content:</strong> Explore diverse topics and enhance your understanding through our curated content.</li>
                    <li><strong>Community-driven Learning:</strong> Connect with like-minded learners and educators to share knowledge and foster collaboration.</li>
                </ul>
            </section>

            <section>
                <h2>Why Choose MindSpark?</h2>
                <ul>
                    <li><strong>Innovative Approach:</strong> We combine cutting-edge technology with educational expertise to create a unique learning experience.</li>
                    <li><strong>Personalized Learning:</strong> Tailored quizzes and content ensure that learning is relevant and meaningful to each user.</li>
                    <li><strong>Fun and Rewarding:</strong> Learning should be fun! Earn rewards and track your progress as you conquer new challenges.</li>
                </ul>
            </section>

            <p>Join the MindSpark community today and embark on a journey of discovery and growth.</p>
        </div>
    );
};

export default AboutPage;
