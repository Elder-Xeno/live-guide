import { useState } from 'react';
import { createEvent } from '../../utilities/posts-api';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import "./AddEventForm.css"

export default function AddEventForm({ onAdd, user }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
        price: 0,
        supportingActs: '',
        spotifyLink: '',
        ticketLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleVenue = (place) => {
        setFormData(prevData => ({
            ...prevData,
            venue: place,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEvent = await createEvent({
                ...formData,
                user: user._id,
                userName: user.name,
            });
            await onAdd(newEvent);
            setFormData({
                title: '',
                description: '',
                venue: '',
                date: '',
                price: 0,
                supportingActs: '',
                spotifyLink: '',
                ticketLink: '',
            });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
            <><h1>Add Gig/Event</h1><div className="add-event-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <br></br>
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <br></br>
                <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
                <br></br>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <br></br>
                <input type="text" name="supportingActs" value={formData.supportingActs} onChange={handleChange} placeholder="Supporting Acts" />
                <br></br>
                <input type="text" name="spotifyLink" value={formData.spotifyLink} onChange={handleChange} placeholder="Spotify Link" />
                <br></br>
                <input type="text" name="ticketLink" value={formData.ticketLink} onChange={handleChange} placeholder="Ticket Link" />
                <br></br>
                <button className='submit-button' type="submit">Add Event</button>
            </form>
            <br></br>
            <GoogleMaps venue={formData.venue} handleVenue={handleVenue} required />
        </div></>
    );
}
