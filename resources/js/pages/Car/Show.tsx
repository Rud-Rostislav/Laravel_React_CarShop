import CarLayout from '@/layouts/car-layout';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Car {
    id: number;
    name: string;
    model: string;
    description: string;
    year: number;
    color: string;
    price: number;
    images: {
        path: string;
    }[];
    user: {
        id: number;
        name: string;
        email: string;
        city: string;
        number: string;
    };
}

export default function Index({ car }: { car: Car }) {
    const [selectedImage, setSelectedImage] = useState(0);

    function prevImage() {
        setSelectedImage((selectedImage - 1 + car.images.length) % car.images.length);
    }

    function nextImage() {
        setSelectedImage((selectedImage + 1) % car.images.length);
    }

    return (
        <CarLayout>
            <Head title={car.name + ' ' + car.model} />
            <div className="flex min-h-[86vh] flex-col items-center justify-center px-10">
                <div className="grid grid-cols-[2fr_1fr] items-center gap-5 max-[1200px]:grid-cols-1">
                    {car.images?.[0]?.path && (
                        <div className="grid grid-cols-[1fr_auto_1fr] justify-items-center gap-5 max-[800px]:grid-cols-1">
                            <button onClick={prevImage}>
                                <ChevronLeft className="h-[10vh] w-[5vw] rounded-2xl bg-black/50 p-2 max-[1000px]:w-[10vw] max-[800px]:hidden max-[800px]:w-[15vw] max-[500px]:w-[25vw] dark:bg-black/35" />
                            </button>
                            <div
                                key={car.id}
                                className="rounded-2xl bg-black/50 shadow-[0_5px_15px_rgba(0,0,0,0.7)] backdrop-blur-3xl dark:bg-black/35"
                            >
                                <div className="overflow-hidden rounded-2xl">
                                    <>
                                        <img
                                            className="h-[fit] max-h-[75vh] w-full object-cover"
                                            src={`/storage/${car.images[selectedImage].path}`}
                                            alt={car.name}
                                        />
                                    </>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-5">
                                <button onClick={prevImage} className="hidden max-[800px]:block">
                                    <ChevronLeft className="h-[10vh] w-[5vw] rounded-2xl bg-black/50 p-2 max-[1000px]:w-[10vw] max-[800px]:w-[15vw] max-[500px]:w-[25vw] dark:bg-black/35" />
                                </button>
                                <button onClick={nextImage}>
                                    <ChevronRight className="h-[10vh] w-[5vw] rounded-2xl bg-black/50 p-2 max-[1000px]:w-[10vw] max-[800px]:w-[15vw] max-[500px]:w-[25vw] dark:bg-black/35" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-center gap-5 rounded-2xl bg-black/50 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:flex-col dark:bg-black/35">
                            <p className="text-2xl font-semibold text-white">{car.user.name}</p>
                            <p className="text-2xl font-semibold text-white">{car.user.city}</p>
                            <p className="text-2xl font-semibold text-white">{car.user.number}</p>
                        </div>

                        <div className="flex items-center justify-center gap-5 rounded-2xl bg-black/50 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:flex-col dark:bg-black/35">
                            <p className="text-2xl font-semibold text-white">{car.name}</p>
                            <p className="text-2xl font-semibold text-white">{car.model}</p>
                        </div>

                        <div className="grid grid-cols-3 items-center justify-items-center rounded-2xl bg-black/50 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:grid-cols-1 dark:bg-black/35">
                            <div className="flex items-center">
                                <p className="text-2xl text-white">Колір:</p>
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: car.color,
                                        marginRight: '10px',
                                        marginLeft: '1rem',
                                    }}
                                    title={car.color}
                                />
                            </div>
                            <p className="text-2xl text-gray-300">Рік: {car.year}</p>
                            <p className="text-2xl text-gray-300">Ціна: {car.price} $</p>
                        </div>

                        <p className="rounded-2xl bg-black/50 p-4 text-center text-gray-300 shadow-[0_5px_15px_rgba(0,0,0,0.7)] dark:bg-black/35">
                            {car.description}
                        </p>
                    </div>
                </div>
            </div>
        </CarLayout>
    );
}
