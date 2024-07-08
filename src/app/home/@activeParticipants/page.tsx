 

import Card from "@/components/Card";
import styles from "../@activeParticipants/ActiveParticipants.module.css";

export default function active() {
    return (
        <Card> 
            <div className={styles.active}>
                <h2>Active Participants</h2>
                <ul>
                    <li>John Doe</li>
                    <li>Jane Smith</li>
                    <li>Robert Brown</li>
                    <li>Emily Davis</li>
                </ul>
            </div>
        </Card>
    );
}
