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

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        console.log("Received", username, password);

        const check = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if (check.rowCount > 0) {
            const storedPassword = check.rows[0].password;
            if (storedPassword === password) {
                // Set cookie for the user
                const cookie = setCookie('user', username, { httpOnly: true, maxAge: 3600 });

                // Return success response with the Set-Cookie header
                return new Response(JSON.stringify({ message: "Login Successful", redirect: "/home" }), {
                    status: 200,
                    headers: {
                        'Set-Cookie': cookie,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                // Return incorrect password response
                return new Response(JSON.stringify({ message: "Wrong Credentials" }), { status: 401 });
            }
        } else {
            // Return user not found response
            return new Response(JSON.stringify({ message: "User Not Found, Try Registering" }), { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });
    }
}
