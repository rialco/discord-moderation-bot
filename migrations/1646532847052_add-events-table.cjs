/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE events (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            name TEXT NOT NULL,
            date TIMESTAMP WITH TIME ZONE NOT NULL,
            type TEXT NOT NULL,
            create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
       DROP TABLE events; 
    `);
};
