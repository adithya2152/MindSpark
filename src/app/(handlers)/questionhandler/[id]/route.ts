 import { NextResponse } from 'next/server';
const pg = require('pg');

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mindspark',
    password: 'adithya',
    port: 5432,
});

db.connect();
 
export async function GET(request:Request , {params}:{params:{id:number}})
{
    try{

        const result = await db.query('SELECT * FROM questions WHERE quiz_id = $1', [params.id]);
        const questions = result.rows;
        return Response.json(questions, { status: 200 });
    }
    catch(err)
    {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        
    }
}
