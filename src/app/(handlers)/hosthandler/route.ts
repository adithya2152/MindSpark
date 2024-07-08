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


export async function POST(request:Request){
    try{

        const {title , description , category , questions , totalQuestions} = await request.json()

        console.log("recieved", 
            title ,
            description,
            category,
            questions,
            totalQuestions
        )
        
        const cookieStore = cookies();
        const username = cookieStore.get('user')   
        
        console.log(username);

        if(username?.value)
        {
            const user = username.value
            const res = await db.query("select * from users where username = $1",[user])
            const userId = res.rows[0].uid;
            
            const out = await db.query(
                "INSERT INTO quiz (host_id, title, description, category, total_questions) VALUES ($1, $2, $3, $4, $5) RETURNING id",
                [userId, title, description, category, totalQuestions]
              );
              
              const quizId = out.rows[0].id;
              console.log('Inserted quiz ID:', quizId);
              

              for (const question of questions) {
                const { question: questionText, options, correctAnswer } = question;
                console.log("Question:", questionText);
                console.log("Options:", JSON.stringify(options));
                console.log("Correct Answer:", correctAnswer);
                
              const ques = await db.query("insert into questions (quiz_id , question , options , correct_answer) values($1,$2,$3,$4)",[quizId , questionText , JSON.stringify(options) , correctAnswer]);
              return new Response(JSON.stringify({message : "Successfully hosted your quiz", redirect:"/home" }) ,{status:201});

            }
        }
        else{
            return new Response(JSON.stringify({message:"User not Logged in , Login to continue" ,redirect:"/login"}),{status:401})
        }
    }

    catch(error)
    {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
    }
}