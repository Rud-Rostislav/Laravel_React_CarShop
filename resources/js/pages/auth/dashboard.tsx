import AppLayout from '@/layouts/app-layout';
import CarLayout from '@/layouts/car-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Мої машини',
        href: '/dashboard',
    },
];

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
    path: string;
}

export default function Dashboard({ cars }: { cars: Cars[] }) {
    const { delete: destroy } = useForm();

    function deleteCar(e: React.MouseEvent, id: number) {
        e.preventDefault();
        if (confirm('Ви впевнені, що хочете видалити цю машину?')) {
            destroy(route('cars.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <CarLayout>
                <Head title="Мої машини" />
                <div className="m-4 grid grid-cols-3 gap-5 max-[1200px]:grid-cols-2 max-[600px]:grid-cols-1">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="rounded-2xl bg-black/50 shadow-[0_5px_15px_rgba(0,0,0,0.7)] backdrop-blur-3xl transition-shadow duration-300 hover:shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
                        >
                            <Link href={route('cars.show', car.id)} className="block overflow-hidden rounded-t-2xl">
                                {car.images?.[0]?.path && (
                                    <img
                                        className="h-[35vh] w-full object-cover transition-transform duration-300 hover:scale-105"
                                        src={`/storage/${car.images[0].path}`}
                                        alt={car.name}
                                    />
                                )}

                                <div className="p-4">
                                    <div className="mt-2 flex flex-col flex-wrap items-center justify-center gap-5">
                                        <p className="text-2xl font-semibold text-white">{car.name}</p>
                                        <p className="text-2xl font-semibold text-white">{car.model}</p>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 justify-items-center text-xl text-gray-300">
                                        <p>{car.year} рік</p>
                                        <p>{car.price} $</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex flex-col flex-wrap justify-center gap-2 p-4">
                                <Link
                                    href={route('cars.edit', car.id)}
                                    className="flex h-[5vh] w-full items-center justify-center gap-2 rounded-4xl border border-white/15 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                    Редагувати
                                </Link>

                                <button
                                    onClick={(e) => deleteCar(e, car.id)}
                                    className="flex h-[5vh] w-full items-center justify-center gap-2 rounded-4xl border border-white/15 px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Видалити
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </CarLayout>
        </AppLayout>
    );
}
