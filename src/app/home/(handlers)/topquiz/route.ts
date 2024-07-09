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
        const result = await db.query(`  select id, title from quiz
                                        where id in (SELECT quiz_id
                                        FROM participation
                                        GROUP BY quiz_id
                                        ORDER BY count(quiz_id) desc limit 5)`
                                    )

        const title = result.rows;
        console.log(title);
                                
        return NextResponse.json(title, { status: 200 });
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}