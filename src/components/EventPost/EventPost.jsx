import './EventPost.css';

export default function EventPost({ eventPost }) {
    return (
        <div className="event-post">
            <h3>{eventPost.title}</h3>
            <p>Description: {eventPost.description}</p>
            <p>Date: {eventPost.date}</p>
            <p>Venue: {eventPost.venue}</p>
            <p>Price: {eventPost.price}</p>
            <p>Supporting Acts: {eventPost.supportingActs.join(', ')}</p>
            <p>Spotify Link: <a href={eventPost.spotifyLink}>{eventPost.spotifyLink}</a></p>
            <p>Ticket Link: <a href={eventPost.ticketLink}>{eventPost.ticketLink}</a></p>
            <p>Posted by: {eventPost.userName}</p>
        </div>
    );
}