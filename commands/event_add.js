import { createEvent } from '../repos/events.js';

export async function addEvent(eventName, eventType, eventDate) {
    // const eDate = new Date(eventDate + ":00:00.000-05:00");
    const dateParts = eventDate.split(".");
    const day = dateParts[0];
    const month = dateParts[1];
    const year = (dateParts[2] === undefined) ? new Date().getFullYear() : 2000 + parseInt(eventDate);
    const eDate = new Date(year, parseInt(month)-1, day);
    
    createEvent(eventName, eventType, eDate);
}