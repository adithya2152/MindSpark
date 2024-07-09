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

export async function GET(request: Request) {
    try {
        const result = await db.query(`
            SELECT username 
            FROM users 
            WHERE uid IN (
                SELECT user_id
                FROM participation
                GROUP BY user_id
                ORDER BY COUNT(user_id) DESC
                LIMIT 5
            )
        `);

        const usernames = result.rows;
        console.log(usernames);

        return NextResponse.json(usernames, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
