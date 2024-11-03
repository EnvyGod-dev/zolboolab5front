import { useEffect, useState } from 'react';
import axios from 'axios';

type Place = {
  _id: string;
  title: string;
  description: string;
  address: string;
  image: string;
};

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/places')
      .then(response => setPlaces(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Places</h1>
      <ul>
        {places.map(place => (
          <li key={place._id}>
            <h2>{place.title}</h2>
            <p>{place.description}</p>
            <p>{place.address}</p>
            <img src={place.image} alt={place.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}
