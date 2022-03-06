import pool from '../pool.js';

const createEvent = async (eventName, eventType, eventDate) => {
    try {
        const { rows } = await pool.query('INSERT INTO events (name, date, type) VALUES ($1, $2, $3) RETURNING *;', [eventName, eventDate, eventType]);
        console.log(rows);
    } catch(err) {
        console.log(err);
    }
}

const getEvents = async() => {
    try {
        const { rows } = await pool.query(`
        SELECT name, date, type
        FROM events
        WHERE date >= CURRENT_DATE::TIMESTAMP and
        date < CURRENT_DATE::TIMESTAMP + interval '1 day'`);
        return rows;
    } catch(err) {
        console.log(err);
    }
}

export { createEvent, getEvents }; 