'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewPlace() {
    const [formData, setFormData] = useState({ title: '', description: '', address: '', image: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const validate = () => {
        let newErrors: { [key: string]: string } = {};

        if (!formData.title) newErrors.title = 'Гарчиг заавал байх ёстой';
        if (!formData.description) newErrors.description = 'Тайлбар заавал байх ёстой';
        if (!formData.address) newErrors.address = 'Гэрийн хаяг заавал байх ёстой';
        if (!formData.image) {
            newErrors.image = 'Зураг заавал байх ёстой';
        } else {
            const urlPattern = new RegExp(
                '^(https?:\\/\\/)?' +
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' +
                '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' +
                '(\\#[-a-zA-Z\\d_]*)?$',
                'i'
            );
            if (!urlPattern.test(formData.image)) {
                newErrors.image = 'Invalid image URL';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post('http://localhost:5000/api/places', formData);
                router.push('/');
            } catch (error) {
                console.error('Failed to add new place', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required />
                {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
            </div>
            <div>
                <label>Description</label>
                <input name="description" value={formData.description} onChange={handleChange} required />
                {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </div>
            <div>
                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} required />
                {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
            </div>
            <div>
                <label>Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} required />
                {errors.image && <span style={{ color: 'red' }}>{errors.image}</span>}
            </div>
            <button type="submit">Add Place</button>
        </form>
    );
}
