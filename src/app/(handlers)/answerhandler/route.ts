const pg = require("pg");
import { cookies } from "next/headers";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});

db.connect();

export async function POST(request:Request)
{
    try{
        const{quiz_id , maxScore , score} = await request.json()
        const cookieStore = cookies();
        const username = cookieStore.get('user') 
        console.log("recieved" , quiz_id , maxScore , score);

        if(username?.value)
        {
            const user = username.value

            const res = await db.query("select * from users where username = $1",[user])
            const userId = res.rows[0].uid;

            const input = await db.query("insert into participation (quiz_id , user_id , max_score , user_score) values ($1,$2,$3,$4)",[quiz_id , userId , maxScore , score]);

            return new Response(JSON.stringify({message:"Successfully stored the answers "}) , {status:201});

        }
        else{
            return new Response(JSON.stringify({message:"User not Logged in , Login to continue" ,redirect:"/login"}),{status:401})
        }
    }   
    catch(err:any){
        console.log(err);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
    }
}

