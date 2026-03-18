import { json } from '@sveltejs/kit';
import pool from '$lib/server/db';
import { checkAuth } from '$lib/server/auth';

// GET a single mountain by ID
export async function GET({ params }) {

  const id = params.id;

  // query database for mountain with this ID
  const [rows] = await pool.query(
    "SELECT * FROM mountains WHERE id = ?",
    [id]
  );

  // if no mountain found then return 404 not found
  if (rows.length === 0) {
    return json(
      { message: "Mountain not found" },
      { status: 404 }
    );
  }

  // return the found mountain status code 200 OK
  return json(rows[0], { status: 200 });
}


// UPDATE a mountain
export async function PUT({ params, request }) {

    // check if user is authorized
    if (!checkAuth(request)) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    const { id } = params;

     // get data from request body
    const { name, location, type, height, region } = await request.json();

    // check if required fields are missing
    if (!name || !location || !type || !height) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    // update mountain in database
    const [result] = await pool.query(
        'UPDATE mountains SET name=?, location=?, type=?, height=?, region=? WHERE id=?',
        [name, location, type, height, region, id]
    );

    // if no rows affected then mountain not found
    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Mountain not found' },
            { status: 404 }
        );
    }

    // success response     
    return Response.json(
        { message: 'Mountain updated' },
        { status: 200 }
    );
}

//DELETE a mountain
export async function DELETE({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    const { id } = params;

    // delete mountain with specific ID from database 
    const [result] = await pool.query(
        'DELETE FROM mountains WHERE id=?',
        [id]
    );

    if (result.affectedRows === 0) {
        return Response.json(
            { message: 'Mountain not found' },
            { status: 404 }
        );
    }

    // success, no content returned
    return new Response(null, { status: 204 });
}