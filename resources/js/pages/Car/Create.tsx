import CarLayout from '@/layouts/car-layout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Model {
    id: number;
    name: string;
}

interface CarName {
    id: number;
    name: string;
    models: Model[];
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

export default function Create({ carName }: { carName: CarName[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        model: '',
        year: '',
        price: '',
        description: '',
        color: '',
        images: [] as File[],
    });

    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

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

    const createCar = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('model', data.model);
        formData.append('year', data.year);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('color', data.color);

        data.images.forEach((image) => {
            formData.append('images[]', image);
        });

        post(route('cars.store'), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <CarLayout>
            <form
                onSubmit={createCar}
                className="mx-auto mt-10 flex w-[50vw] flex-col gap-4 rounded-xl bg-black/35 p-4 text-white max-[1000px]:w-[80vw] max-[500px]:w-[90vw]"
            >
                <select className="transparent-button" value={carName.find((b) => b.name === data.name)?.id || ''} onChange={handleBrandChange}>
                    <option value="">Оберіть марку</option>
                    {carName.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>

                {selectedModels.length > 0 && (
                    <select className="transparent-button" value={data.model} onChange={handleModelChange} disabled={selectedModels.length === 0}>
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

                <input
                    type="number"
                    className="transparent-button"
                    placeholder="Рік"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                />

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
                    {previews.map((src, index) => (
                        <img key={index} src={src} alt={`preview-${index}`} className="h-[15vh] w-[10vw] rounded-2xl object-cover" />
                    ))}
                </div>

                <button className="transparent-button" type="submit" disabled={processing}>
                    Додати автомобіль
                </button>

                {Object.entries(errors).map(([field, msg]) => (
                    <p key={field} className="text-sm text-red-500">
                        {msg as string}
                    </p>
                ))}
            </form>
        </CarLayout>
    );
}
