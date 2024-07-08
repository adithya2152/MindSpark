import { NextRequest, NextResponse } from 'next/server';
const pg = require("pg")

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mindspark',
  password: 'adithya',
  port: 5432,
});
db.connect();

export async function GET(req: NextRequest) {
  try {
    const result = await db.query('SELECT * FROM quiz');
    const details = result.rows;

    return NextResponse.json(details, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
