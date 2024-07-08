// import Card from "@/components/Card"
// import Link from "next/link"
// import styles from "../@main/Main.module.css"
// export default function main()
// {
//     return(
          
//         <Card> 
//              <div className={styles.main}>
//                 <h2>Welcome to MindSpark</h2>

//                 <Link  className="button" href="/explore">Attend a Quiz</Link>
//                 <Link  className="button" href="/host"> Host a Quiz</Link>
//             </div>
//         </Card>
            
//     )
// }
import Card from "@/components/Card";
import Link from "next/link";
import styles from "../@main/Main.module.css";

export default function main() {
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
                        <p>15</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Hosted Quiz Participants</h3>
                        <p>120</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Completed Quizzes</h3>
                        <p>45</p>
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
