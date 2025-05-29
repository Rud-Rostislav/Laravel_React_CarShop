import CarLayout from '@/layouts/car-layout';
import { Link } from '@inertiajs/react';

interface Cars {
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
}

export default function Index({ cars }: { cars: Cars[] }) {
    return (
        <CarLayout>
            <div className="m-4 grid grid-cols-4 gap-5 max-[1200px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
                {cars.map((car) => (
                    <Link
                        href={route('cars.show', car.id)}
                        key={car.id}
                        className="rounded-2xl bg-black/50 dark:bg-black/35 shadow-[0_5px_15px_rgba(0,0,0,0.7)] backdrop-blur-3xl transition-shadow duration-300 hover:shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                    >
                        <div className="overflow-hidden rounded-t-2xl">
                            {car.images?.[0]?.path && (
                                <img
                                    className="h-[35vh] w-full object-cover transition-transform duration-300 hover:scale-105"
                                    src={`/storage/${car.images[0].path}`}
                                    alt={car.name}
                                />
                            )}
                        </div>

                        <div className="p-4">
                            <div className="mt-2 flex items-center justify-center gap-5">
                                <p className="text-2xl font-semibold text-white">{car.name}</p>
                                <p className="text-2xl font-semibold text-white">{car.model}</p>
                            </div>

                            <div className="align-items-center mt-4 grid grid-cols-2 justify-items-center">
                                <p className="text-xl text-gray-300">{car.year} рік</p>
                                <p className="text-xl text-gray-300">{car.price} $</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </CarLayout>
    );
}
