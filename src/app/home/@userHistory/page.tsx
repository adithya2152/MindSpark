 

import Card from "@/components/Card";
import Link from "next/link";
import styles from "../@userHistory/UserHistory.module.css"

export default function history() {
    return (
        <Card> 
            <div className={styles.history}>
                <h2>Quiz History</h2>
                <ul>
                    <li>Quiz on Space Exploration - Completed</li>
                    <li>History of the Roman Empire - In Progress</li>
                    <li>Basics of Quantum Physics - Not Started</li>
                    <li>World Geography - Completed</li>
                </ul>
               
            </div>
        </Card>
    );
}
