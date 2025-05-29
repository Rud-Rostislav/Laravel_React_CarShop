import CarLayout from '@/layouts/car-layout';
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
            <div className="m-4 grid grid-cols-3 gap-5 max-[1200px]:grid-cols-1">
                {car.images?.[0]?.path && (
                    <div className="col-span-2 flex flex-col">
                        <div key={car.id} className="rounded-2xl bg-black/50 dark:bg-black/35 shadow-[0_5px_15px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
                            <div className="overflow-hidden rounded-2xl">
                                <>
                                    <img
                                        className="h-[80vh] w-full object-cover max-[800px]:h-[50vh] max-[500px]:h-[40vh]"
                                        src={`/storage/${car.images[selectedImage].path}`}
                                        alt={car.name}
                                    />
                                </>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center gap-5">
                            <button onClick={prevImage}>
                                <ChevronLeft className="h-[10vh] w-[7vw] rounded-2xl bg-black/50 dark:bg-black/35 p-2 max-[1000px]:w-[10vw] max-[800px]:w-[15vw] max-[500px]:w-[25vw]" />
                            </button>
                            <button onClick={nextImage}>
                                <ChevronRight className="h-[10vh] w-[7vw] rounded-2xl bg-black/50 dark:bg-black/35 p-2 max-[1000px]:w-[10vw] max-[800px]:w-[15vw] max-[500px]:w-[25vw]" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-center gap-5 rounded-2xl bg-black/50 dark:bg-black/35 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:flex-col">
                        <p className="text-2xl font-semibold text-white">{car.name}</p>
                        <p className="text-2xl font-semibold text-white">{car.model}</p>
                    </div>

                    <div className="grid grid-cols-3 items-center justify-items-center rounded-2xl bg-black/50 dark:bg-black/35 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:grid-cols-1">
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

                    <p className="rounded-2xl bg-black/50 dark:bg-black/35 p-4 text-center text-gray-300 shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
                        {car.description}
                    </p>

                    <div className="flex items-center justify-center gap-5 rounded-2xl bg-black/50 dark:bg-black/35 p-4 shadow-[0_5px_15px_rgba(0,0,0,0.7)] max-[600px]:flex-col">
                        <p className="text-2xl font-semibold text-white">{car.user.name}</p>
                        <p className="text-2xl font-semibold text-white">{car.user.city}</p>
                        <p className="text-2xl font-semibold text-white">{car.user.number}</p>
                    </div>
                </div>
            </div>
        </CarLayout>
    );
}
