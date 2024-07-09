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
        const username = cookieStore.get('user')?.value;

        if (username) {
            const res = await db.query("SELECT * FROM users WHERE username = $1", [username]);
            const userId = res.rows[0].uid;

            const hostedCountRes = await db.query("SELECT COUNT(*) FROM quiz WHERE host_id = $1", [userId]);
            const hosted_count = hostedCountRes.rows[0].count;

            const hostedResponseRes = await db.query("SELECT COUNT(user_id) FROM participation p JOIN quiz q ON p.quiz_id = q.id WHERE q.host_id = $1", [userId]);
            const hosted_response = hostedResponseRes.rows[0].count;

            const participatedRes = await db.query("SELECT COUNT(user_id) FROM participation WHERE user_id = $1", [userId]);
            const participated = participatedRes.rows[0].count;

            return NextResponse.json({ hosted_count, hosted_response, participated } , {status:200});
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
