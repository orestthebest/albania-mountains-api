import { json } from '@sveltejs/kit';
import pool from '$lib/server/db';
import { checkAuth } from '$lib/server/auth';

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

export async function PUT({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    const { id } = params;

    const { name, location, type, height, region } = await request.json();

    if (!name || !location || !type || !height) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        'UPDATE mountains SET name=?, location=?, type=?, height=?, region=? WHERE id=?',
        [name, location, type, height, region, id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Mountain not found' },
            { status: 404 }
        );
    }

    return Response.json(
        { message: 'Mountain updated' },
        { status: 200 }
    );
}