'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { CreatePropertySchema, CreatePropertyFormFields } from '../../types/property';
import { useAuth } from '../../hooks/useAuth';
import api from '../../lib/api'; 
import { useState, useEffect } from 'react';

export default function AddPropertyPage() {
    const { user, isAdmin, isLoading } = useAuth();
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Redirect non-admin users or if still loading
    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.replace('/');
        }
    }, [isLoading, isAdmin, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreatePropertyFormFields>({
        resolver: zodResolver(CreatePropertySchema),
        defaultValues: {
            title: '',
            description: '',
            imageUrl: '',
            location: '',
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
            perNightPrice: 10,
            amenities: '',
        },
    });

    const onSubmit = async (data: CreatePropertyFormFields) => {
        try {
            const amenitiesArray = data.amenities
                ? data.amenities.split(',').map(item => item.trim()).filter(item => item.length > 0)
                : [];

                const submissionData = {
                    title: data.title,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    location: data.location,
                    guests: Number(data.guests),
                    bedrooms: Number(data.bedrooms),
                    bathrooms: Number(data.bathrooms),
                    perNightPrice: Number(data.perNightPrice),
                    amenities: amenitiesArray,
                };
    

            await api.post('/properties', submissionData);
            setStatus('success');
            reset();
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error: any) {
            console.error("Error creating property:", error);
            const errorMessage = error.response?.data?.error || "Failed to create property. Check server logs.";
            setError("root", { message: errorMessage });
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    if (isLoading || !isAdmin) {
        // Show a loading/redirecting message while auth check runs
        return <div className="text-center py-20 text-lg text-gray-500">{isLoading ? "Checking permissions..." : "Access denied."}</div>;
    }

    return (
        <div className="flex justify-center py-12">
            <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-2xl border-t-8 border-sw-primary">
                <Link href="/properties" className="text-sw-primary hover:text-sw-dark flex items-center mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Properties
                </Link>
                <h1 className="text-4xl font-serif font-bold text-sw-dark mb-2 text-center">
                    Add New Property
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Enter the details of the luxury property to list on StayWise.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Basic Details: Title and Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                placeholder="Luxury Villa with Pool"
                                {...register('title')}
                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                placeholder="e.g., Beachside, California"
                                {...register('location')}
                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                            />
                            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            rows={4}
                            placeholder="A detailed description of the property, surrounding area, and features."
                            {...register('description')}
                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* Media and Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL (Main Photo)</label>
                        <input
                            type="url"
                            placeholder="https://example.com/property-image.jpg"
                            {...register('imageUrl')}
                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                        />
                        {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl.message}</p>}
                    </div>

                    {/* Numeric Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'guests', label: 'Max Guests' },
                            { name: 'bedrooms', label: 'Bedrooms' },
                            { name: 'bathrooms', label: 'Bathrooms' },
                            { name: 'perNightPrice', label: 'Price ($/Night)' },
                        ].map(({ name, label }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type="number"
                                    step={name === 'perNightPrice' ? "0.01" : "1"}
                                    min="1"
                                    placeholder="1"
                                    // Use 'valueAsNumber' to ensure react-hook-form handles it as a number
                                    {...register(name as keyof CreatePropertyFormFields, { valueAsNumber: true })}
                                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                                />
                                {errors[name as keyof CreatePropertyFormFields] && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors[name as keyof CreatePropertyFormFields]?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amenities (Comma-separated)</label>
                        <input
                            type="text"
                            placeholder="Pool, WiFi, Parking, AC"
                            {...register('amenities')}
                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-sw-primary focus:border-sw-primary"
                        />
                        <p className="mt-1 text-xs text-gray-500">List amenities separated by commas (e.g., Pool, WiFi, Gym)</p>
                    </div>

                    {/* Status Message */}
                    {errors.root && (
                        <p className="mt-4 text-sm text-red-600 font-bold text-center border p-2 bg-red-50 rounded-lg">
                            {errors.root.message}
                        </p>
                    )}
                    
                    {status === 'success' && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center font-medium">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Property created successfully!
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || status === 'success'}
                        className="w-full py-3 rounded-lg text-lg font-bold text-white transition duration-300 bg-sw-primary hover:bg-sw-dark disabled:opacity-50 shadow-lg"
                    >
                        {isSubmitting ? 'Creating Property...' : 'List Property'}
                    </button>
                </form>
            </div>
        </div>
    );
}