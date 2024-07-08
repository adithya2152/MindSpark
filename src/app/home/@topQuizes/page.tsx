// import Card from "@/components/Card"
// export default function topquiz()
// {
//     return(
         
//         <Card> 
//              <div>
//                 topquiz
//             </div>
//         </Card>
            
//     )
// }

import Card from "@/components/Card";
import styles from "../@topQuizes/TopQuiz.module.css"

export default function topquiz() {
    return (
        <Card> 
            <div className={styles.topquiz}>
                <h2>Top Quizzes</h2>
                <ul>
                    <li>Quiz on Space Exploration</li>
                    <li>History of the Roman Empire</li>
                    <li>Basics of Quantum Physics</li>
                    <li>World Geography</li>
                </ul>
            </div>
        </Card>
    );
}
