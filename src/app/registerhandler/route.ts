const pg = require("pg");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mindspark",
    password: "adithya",
    port: 5432,
});
db.connect();

export async function POST(request : Request) {
    try {
        const { username, password } = await request.json();
        console.log("Received", username, password);

        const check = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = check.rows[0];

        if (user) {
            // User already exists
            return new Response(JSON.stringify({ message: 'User already registered.' }), { status: 409 });
        }else{

            const res = await db.query("insert into users (username, password) values($1,$2)",[username,password]);
            return new Response(JSON.stringify({ message: 'User registered successfully.' }), { status: 201 });
        }


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
    }
}
