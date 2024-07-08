import Question from "@/app/quiz/[id]/page";
import { NextRequest , NextResponse} from "next/server";

const pg = require("pg")

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});

db.connect();



export async function GET(req:NextRequest)
{
    try {
        const result = await db.query('SELECT * FROM questions');
        const question = result.rows;
    
        return NextResponse.json(question, { status: 200 });
        
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}