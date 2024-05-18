import { useState } from 'react';
import { createEvent } from '../../utilities/posts-api';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import "./AddEventForm.css"
import { useNavigate } from 'react-router-dom';

export default function AddEventForm({ onAdd, user }) {
    const navigate = useNavigate();
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
            navigate('/');
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
            <><img src="https://i.imgur.com/4IWQE6M.png" alt="add-gig-logo" className="add-gig-logo" />
            <div className="add-event-form">
            <form className='form-input' onSubmit={handleSubmit}>
                <input className='title' type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required style={{width:500}} />
                <br></br>
                <input className='description' type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required  />
                <br></br>
                <input className='date' type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
                <br></br>
                <input className='price' type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <br></br>
                <input className='supports' type="text" name="supportingActs" value={formData.supportingActs} onChange={handleChange} placeholder="Supporting Acts" />
                <br></br>
                <input className='spotify' type="text" name="spotifyLink" value={formData.spotifyLink} onChange={handleChange} placeholder="Spotify Link" />
                <br></br>
                <input className='tickets' type="text" name="ticketLink" value={formData.ticketLink} onChange={handleChange} placeholder="Ticket Link" />
                <br></br>
                <button className='submit-button' type="submit">Add Event</button>
            </form>
            <br></br>
            <GoogleMaps venue={formData.venue} handleVenue={handleVenue} required/>
            {/* <button className='google-button'>Find Venue</button> */}
        </div></>
    );
}
