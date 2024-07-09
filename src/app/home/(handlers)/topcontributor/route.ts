import { NextResponse } from 'next/server';
import { Client } from 'pg';

const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});

db.connect();

export async function GET(request:Request)
{
    try{
        const result = await db.query(` select uid , username from users 
                                        where uid in (SELECT host_id
                                        FROM quiz
                                        GROUP BY host_id
                                        ORDER BY count(host_id) desc limit 5)`)

        const usernames = result.rows;
        console.log(usernames);
                                
        return NextResponse.json(usernames, { status: 200 });
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}