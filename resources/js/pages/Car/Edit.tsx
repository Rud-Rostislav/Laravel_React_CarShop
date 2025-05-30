import CarLayout from '@/layouts/car-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Model {
    id: number;
    name: string;
}

interface CarName {
    id: number;
    name: string;
    models: Model[];
}

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
    path: string;
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

export default function Edit({ carName, car }: { carName: CarName[]; car: Car }) {
    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const { data, setData, put, processing, errors } = useForm({
        name: car.name,
        model: car.model,
        year: car.year.toString(),
        price: car.price.toString(),
        description: car.description,
        color: car.color,
        images: [] as File[],
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1975 + 1 }, (_, i) => currentYear - i);

    // Завантаження моделей поточної марки
    useEffect(() => {
        const currentBrand = carName.find((b) => b.name === data.name);
        setSelectedModels(currentBrand?.models || []);
    }, [data.name, carName]);

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brandId = parseInt(e.target.value);
        const brand = carName.find((b) => b.id === brandId);
        setData('name', brand?.name || '');
        setSelectedModels(brand?.models || []);
        setData('model', '');
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('model', e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', files);
            setPreviews(files.map((file) => URL.createObjectURL(file)));
        }
    };

    const updateCar = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('model', data.model);
        formData.append('year', data.year.toString());
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        formData.append('color', data.color);

        data.images.forEach((image) => {
            formData.append('images[]', image);
        });

        put(route('cars.update', car.id), formData, {
            forceFormData: true,
        });
    };

    return (
        <CarLayout>
            <Head title={'Редагування ' + car.name + ' ' + car.model} />
            <div className="flex min-h-[86vh] flex-col items-center justify-center px-10">
                <form
                    onSubmit={updateCar}
                    className="mx-auto flex w-[50vw] flex-col gap-4 rounded-xl bg-black/35 p-4 text-white max-[1000px]:w-[80vw] max-[500px]:w-[90vw]"
                >
                    <select className="transparent-button" value={carName?.find((b) => b.name === data.name)?.id || ''} onChange={handleBrandChange}>
                        <option value="">Оберіть марку</option>
                        {carName.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>

                    {selectedModels.length > 0 && (
                        <select className="transparent-button" value={data.model} onChange={handleModelChange}>
                            <option value="">Оберіть модель</option>
                            {selectedModels.map((model) => (
                                <option key={model.id} value={model.name}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <select className="transparent-button" value={data.color} onChange={(e) => setData('color', e.target.value)}>
                        <option value="">Оберіть колір</option>
                        {colors.map((color) => (
                            <option key={color.value} value={color.value}>
                                {color.label}
                            </option>
                        ))}
                    </select>

                    <select className="transparent-button" value={data.year} onChange={(e) => setData('year', e.target.value)}>
                        <option value="">Оберіть рік</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="transparent-button"
                        placeholder="Ціна $"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                    />

                    <input
                        type="text"
                        className="transparent-button"
                        placeholder="Опис"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <input className="transparent-button" type="file" multiple onChange={handleFileChange} />

                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                        {car.images.map((img, i) => (
                            <img
                                key={`old-${i}`}
                                src={`/storage/${img.path}`}
                                alt={`existing-${i}`}
                                className="h-[fit] w-[10vw] rounded-2xl object-cover"
                            />
                        ))}

                        {previews.map((src, index) => (
                            <img key={`new-${index}`} src={src} alt={`preview-${index}`} className="h-[fit] w-[10vw] rounded-2xl object-cover" />
                        ))}
                    </div>

                    <button className="transparent-button" type="submit" disabled={processing}>
                        Оновити автомобіль
                    </button>

                    {Object.entries(errors).map(([field, msg]) => (
                        <p key={field} className="text-sm text-red-500">
                            {msg as string}
                        </p>
                    ))}
                </form>
            </div>
        </CarLayout>
    );
}
