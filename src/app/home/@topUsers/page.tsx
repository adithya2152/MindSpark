// import Card from "@/components/Card";

// export default function topusers()
// {
//     return(
//         <Card> Top Users </Card>
//     )
// }

import Card from "@/components/Card";
import styles from "../@topUsers/TopUsers.module.css"

export default function topusers() {
    return (
        <Card> 
            <div className={styles.topusers}>
                <h2>Top Users</h2>
                <ul>
                    <li>Alice Green</li>
                    <li>Bob White</li>
                    <li>Charlie Black</li>
                    <li>Diana Gray</li>
                </ul>
            </div>
        </Card>
    );
}
