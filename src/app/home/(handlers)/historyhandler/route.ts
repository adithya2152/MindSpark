import { NextResponse } from 'next/server';
import { Client } from 'pg';
import { cookies } from "next/headers";


const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});

db.connect();

export async function GET(request: Request) {
    try {

        const cookieStore = cookies();
        const username = cookieStore.get('user') 

        if(username?.value)
        {
            const user = username.value
            const res = await db.query("select * from users where username = $1",[user])
            const userId = res.rows[0].uid;

            const result = await db.query("select title from quiz q join participation p on p.quiz_id = q.id where p.user_id = $1 order by p.pid desc limit 5",[userId]);

            const title = result.rows;
            console.log(title);

            return NextResponse.json(title, { status: 200 });
        }
        
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
