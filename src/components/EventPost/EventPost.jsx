import './EventPost.css';

export default function EventPost({ eventPost }) {
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="event-post">
            <>
            <h2 className='event.title' style={{ textTransform: 'uppercase' }}>{eventPost.title}</h2>
                <p>Description: {eventPost.description}</p>
                <p>Date: {formatDate(eventPost.date)}</p>
                <p>Venue:  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventPost.venue)}`} target="_blank">{eventPost.venue}</a></p>
                <p>Price: ${eventPost.price}</p>
                <p>Supporting Acts: {eventPost.supportingActs.join(', ')}</p>
                <p>Spotify Link: <button className='spotify-link' onClick={() => window.open(eventPost.spotifyLink, '_blank')}>SPOTIFY</button></p>
                <p>Ticket Link: <button className='ticket-link' onClick={() => window.open(eventPost.ticketLink, '_blank')}>TICKETS</button></p>
            </>
        </div>
    );
}
