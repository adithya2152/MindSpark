const pg = require("pg")

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"mindspark",
    password:"adithya",
    port:5432,
});
db.connect();

export async function POST(request:Request)
{
    try{
        const{username , password} = await request.json();
        console.log("Reacieved" , username , password);

        const check = await db.query("select * from users where username = $1",[username]);
        if(check.rowCount>0)
        {
            const d_pass = check.rows[0].password
            if(d_pass === password)
            {
                return new Response(JSON.stringify({message : "Login Successfull"}),{status:200});
            }
            else
            {
                return new Response(JSON.stringify({message: "Wrong Credentials "}),{status:404});
            }
        }
        else {
            return new Response(JSON.stringify({message : "User Not Found , Try registering"}),{status:404})
        }
    }
    catch(error)
    {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred.' }), { status: 500 });

    }
}