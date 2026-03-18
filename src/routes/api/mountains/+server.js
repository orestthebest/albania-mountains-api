import pool from '$lib/server/db';
import { checkAuth } from '$lib/server/auth';

// GET all mountains
export async function GET() {
    
    // get all rows from database
    const [rows] = await pool.query('SELECT * FROM mountains');

    return Response.json(rows, { status: 200 });
}

// CREATE a new mountain
export async function POST({ request }) {
  
  // check authentication
  if (!checkAuth(request)) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  // get data from request body
  const { id, name, location, type, height, region } = await request.json();

  // validate required fields
  if (!id || !name || !location || !type || !height) {
    return Response.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  // insert into database
  const [result] = await pool.query(
    'INSERT INTO mountains (id, name, location, type, height, region) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, location, type, height, region]
  );

  // return success + new ID
  return Response.json(
    { message: 'Mountain created', id: result.insertId },
    { status: 201 }
  );
}