import { json } from '@sveltejs/kit';
import pool from '$lib/server/db';


export async function GET({ params }) {

  const id = params.id;

  const [rows] = await pool.query(
    "SELECT * FROM mountains WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return json(
      { message: "Mountain not found" },
      { status: 404 }
    );
  }

  return json(rows[0], { status: 200 });
}