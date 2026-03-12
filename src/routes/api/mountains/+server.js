import pool from '$lib/server/db';
import { checkAuth } from '$lib/server/auth';


export async function GET() {

    const [rows] = await pool.query('SELECT * FROM mountains');

    return Response.json(rows, { status: 200 });
}


export async function POST({ request }) {

  if (!checkAuth(request)) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { id, name, location, type, height, region } = await request.json();


  if (!id || !name || !location || !type || !height) {
    return Response.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  const [result] = await pool.query(
    'INSERT INTO mountains (id, name, location, type, height, region) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, location, type, height, region]
  );

  return Response.json(
    { message: 'Mountain created', id: result.insertId },
    { status: 201 }
  );
}