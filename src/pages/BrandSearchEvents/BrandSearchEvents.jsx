import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventShelf from "../../../components/EventShelf";
import { useBrand } from '../../BrandContext';

const BrandSearchEvents = () => {
    const { word } = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { brandId } = useBrand();
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost/brand/api/v1/event/search/${brandId}?term=${encodeURIComponent(word)}`);
                if (!response.ok) {
                    throw new Error('Response was not ok');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [word]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Search Results for "{word}"</h2>
            {events.length > 0 ? (
                <EventShelf events={events} />
            ) : (
                <p>No events found for "{word}".</p>
            )}
        </div>
    );
};

export default BrandSearchEvents;
