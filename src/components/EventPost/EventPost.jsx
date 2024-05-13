import './EventPost.css';

export default function EventPost({ eventPost }) {
    return (
        <div className="event-post">
            <>
                <h2 className='event.title'>{eventPost.title}</h2>
                <p>Description: {eventPost.description}</p>
                <p>Date: {eventPost.date}</p>
                {/* Venue with address link */}
                <p>Venue: <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventPost.venue)}`} target="_blank">{eventPost.venue}</a></p>
                <p>Price: {eventPost.price}</p>
                <p>Supporting Acts: {eventPost.supportingActs.join(', ')}</p>
                <p>Spotify Link: <a href={eventPost.spotifyLink} target="_blank">{eventPost.spotifyLink}</a></p>
                <p>Ticket Link: <a href={eventPost.ticketLink} target="_blank">{eventPost.ticketLink}</a></p>
            </>
        </div>
    );
}
