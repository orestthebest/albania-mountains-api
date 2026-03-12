import { json } from '@sveltejs/kit';
import pool from '$lib/server/db';


export async function GET() {

  const [rows] = await pool.query(
    "SELECT * FROM mountains"
  );

  return json(rows, { status: 200 });
}