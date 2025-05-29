import CarLayout from '@/layouts/car-layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

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

interface carName {
    id: number;
    name: string;
    models: { id: number; name: string }[];
}

const colors = [
    { value: 'black', label: 'Чорний' },
    { value: 'white', label: 'Білий' },
    { value: 'silver', label: 'Сріблястий' },
    { value: 'gray', label: 'Сірий' },
    { value: 'red', label: 'Червоний' },
    { value: 'blue', label: 'Синій' },
    { value: 'green', label: 'Зелений' },
    { value: 'yellow', label: 'Жовтий' },
    { value: 'orange', label: 'Помаранчевий' },
    { value: 'brown', label: 'Коричневий' },
];

export default function Index({ cars, carName }: { cars: Cars[]; carName: carName[] }) {
    const [draft, setDraft] = useState({
        name: '',
        model: '',
        yearFrom: '',
        yearTo: '',
        color: '',
        priceFrom: '',
        priceTo: '',
    });
    const [filters, setFilters] = useState({
        name: '',
        model: '',
        yearFrom: '',
        yearTo: '',
        color: '',
        priceFrom: '',
        priceTo: '',
    });
    const [selectedModels, setSelectedModels] = useState<{ id: number; name: string }[]>([]);

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandId = parseInt(e.target.value);
        const brand = carName.find((b) => b.id === brandId);
        setDraft({ ...draft, name: brand?.name || '', model: '' });
        setSelectedModels(brand?.models || []);
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDraft({ ...draft, model: e.target.value });
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDraft({ ...draft, color: e.target.value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft({ ...draft, [e.target.name]: e.target.value });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...draft });
    };

    const handleReset = () => {
        setDraft({ name: '', model: '', yearFrom: '', yearTo: '', color: '', priceFrom: '', priceTo: '' });
        setFilters({ name: '', model: '', yearFrom: '', yearTo: '', color: '', priceFrom: '', priceTo: '' });
        setSelectedModels([]);
    };

    const filteredCars = cars.filter((car) => {
        const year = car.year;
        const price = car.price;
        const yearFrom = filters.yearFrom ? parseInt(filters.yearFrom) : null;
        const yearTo = filters.yearTo ? parseInt(filters.yearTo) : null;
        const priceFrom = filters.priceFrom ? parseInt(filters.priceFrom) : null;
        const priceTo = filters.priceTo ? parseInt(filters.priceTo) : null;
        return (
            (filters.name === '' || car.name === filters.name) &&
            (filters.model === '' || car.model === filters.model) &&
            (yearFrom === null || year >= yearFrom) &&
            (yearTo === null || year <= yearTo) &&
            (filters.color === '' || car.color === filters.color) &&
            (priceFrom === null || price >= priceFrom) &&
            (priceTo === null || price <= priceTo)
        );
    });

    return (
        <CarLayout>
            <Head title="AutoMria" />
            <form onSubmit={handleSearch} className="my-10 grid h-[50px] grid-cols-9 gap-2">
                <select
                    className="appearance-none rounded-[1rem] border bg-black/50 px-2 py-1 text-center text-white"
                    value={carName.find((b) => b.name === draft.name)?.id || ''}
                    onChange={handleBrandChange}
                >
                    <option value="">Оберіть марку</option>
                    {carName.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.model}
                    onChange={handleModelChange}
                    disabled={selectedModels.length === 0}
                >
                    <option value="">Оберіть модель</option>
                    {selectedModels.map((model) => (
                        <option key={model.id} value={model.name}>
                            {model.name}
                        </option>
                    ))}
                </select>
                <select
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.color}
                    onChange={handleColorChange}
                >
                    <option value="">Оберіть колір</option>
                    {colors.map((color) => (
                        <option key={color.value} value={color.value}>
                            {color.label}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="yearFrom"
                    placeholder="Рік від"
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.yearFrom}
                    onChange={handleChange}
                    min={1900}
                />
                <input
                    type="number"
                    name="yearTo"
                    placeholder="Рік до"
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.yearTo}
                    onChange={handleChange}
                    min={1900}
                />
                <input
                    type="number"
                    name="priceFrom"
                    placeholder="Ціна від"
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.priceFrom}
                    onChange={handleChange}
                    min={0}
                />
                <input
                    type="number"
                    name="priceTo"
                    placeholder="Ціна до"
                    className="appearance-none rounded-[1rem] bg-black/50 px-2 py-1 text-center text-white"
                    value={draft.priceTo}
                    onChange={handleChange}
                    min={0}
                />
                <button type="submit" className="appearance-none rounded-[1rem] bg-black/50 text-center text-white">
                    Шукати
                </button>
                <button onClick={handleReset} type="reset" className="appearance-none rounded-[1rem] bg-black/50 text-center text-white">
                    Скинути
                </button>
            </form>
            <div className="grid grid-cols-4 gap-5 max-[1200px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
                {filteredCars.map((car) => (
                    <Link
                        href={route('cars.show', car.id)}
                        key={car.id}
                        className="rounded-2xl bg-black/50 shadow-[0_5px_15px_rgba(0,0,0,0.7)] backdrop-blur-3xl transition-shadow duration-300 hover:shadow-[0_10px_15px_rgba(0,0,0,0.7)] dark:bg-black/35"
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
