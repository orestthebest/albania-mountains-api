import pool from '$lib/server/db';
import { checkAuth } from '$lib/server/auth';


export async function GET() {

    const [rows] = await pool.query('SELECT * FROM mountains');

    return Response.json(rows, { status: 200 });
}
