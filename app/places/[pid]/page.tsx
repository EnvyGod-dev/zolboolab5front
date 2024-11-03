import { useEffect, useState } from 'react';
import axios from 'axios';

type Place = {
    _id: string;
    title: string;
    description: string;
    address: string;
    image: string;
};

export default function PlaceDetails({ params }: { params: { pid: string } }) {
    const [place, setPlace] = useState<Place | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/places/${params.pid}`)
            .then(response => setPlace(response.data))
            .catch(error => console.error(error));
    }, [params.pid]);

    if (!place) return <div>Loading...</div>;

    return (
        <div>
            <h1>{place.title}</h1>
            <p>{place.description}</p>
            <p>{place.address}</p>
            <img src={place.image} alt={place.title} width="200" />
        </div>
    );
}
