import { redirect } from "next/dist/server/api-utils";

const pg = require("pg");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});
db.connect();

// Utility function to create the Set-Cookie header
function setCookie(name: string, value: string, options: { maxAge?: number; domain?: string; secure?: boolean; httpOnly?: boolean } = {}): string {
    const cookieParts = [`${name}=${value}`];
    if (options.maxAge) cookieParts.push(`Max-Age=${options.maxAge}`);
    if (options.domain) cookieParts.push(`Domain=${options.domain}`);
    if (options.secure) cookieParts.push(`Secure`);
    if (options.httpOnly) cookieParts.push(`HttpOnly`);
    return cookieParts.join('; ');
}

export async function POST(request : Request) {
    try {
        const { username, password , email} = await request.json();
        console.log("Received", username, password);

        const check = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = check.rows[0];

        if (user) {
            // User already exists
            return new Response(JSON.stringify({ message: 'User already registered.' }), { status: 409 });
        }else{

            const res = await db.query("insert into users (username, email ,password) values($1,$2,$3)",[username,email,password]);
            
            // Set cookie for the user
            const cookie = setCookie('user', username, { httpOnly: true, maxAge: 3600 });

            return new Response(JSON.stringify({ message: 'User registered successfully.' , redirect:"/home" }), { status: 201 ,
                headers:{
                    'Set-Cookie':cookie,
                    'Content-Type':"application/json"
                }
            });
        }


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
    }
}
