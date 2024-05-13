import { useState } from 'react';
import { createEvent } from '../../utilities/posts-api';

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
        <div className="add-event-form">
            <h2>Add Gig/Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Venue" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <input type="text" name="supportingActs" value={formData.supportingActs} onChange={handleChange} placeholder="Supporting Acts" />
                <input type="text" name="spotifyLink" value={formData.spotifyLink} onChange={handleChange} placeholder="Spotify Link" />
                <input type="text" name="ticketLink" value={formData.ticketLink} onChange={handleChange} placeholder="Ticket Link" />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}
