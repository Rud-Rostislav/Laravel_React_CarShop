<?php

namespace Database\Seeders;

use App\Models\Car\Car;
use App\Models\Car\CarModel;
use App\Models\Car\CarName;
use App\Models\Car\Image;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $testDescription = 'Автомобіль у відмінному стані — доглянутий до найменшої деталі. Не був учасником ДТП, жодна деталь не фарбувалась. Салон чистий, не прокурений, оздоблений якісними матеріалами. Працює кожна кнопка — від кондиціонера до підігріву дзеркал.
                            Проведено повне ТО: замінені всі рідини, фільтри, ремені та гальмівні колодки. Двигун працює рівно, коробка перемикає м’яко, ходова без жодного стуку — їде тихо й упевнено. Обладнана сучасною мультимедіа-системою, камерою заднього огляду, круїз-контролем і системою стабілізації.
                            Встановлено якісний тюнінг: нові легкосплавні диски, тонування, LED-оптика, спортивний вихлоп (сертифікований). Гума — свіжа, акумулятор — новий. Авто обкатане, щоденно в експлуатації.
                            Торг присутній біля капоту — телефонуйте, домовимось. Готовий до будь-яких перевірок на СТО. Ідеальний варіант як для міста, так і для далеких подорожей. Машина варта вашої уваги!';

        User::factory()->create([
            'name' => 'Адмін',
            'number' => '0678945678',
            'city' => 'Київ',
            'email' => 'admin@mail',
            'password' => '1',
        ]);
        User::factory()->create([
            'name' => 'Користувач',
            'number' => '0678945677',
            'city' => 'Харків',
            'email' => 'user@mail',
            'password' => '1',
        ]);


        CarName::create([
            'name' => 'Toyota',
        ]);
        CarModel::create([
            'name' => 'Camry',
            'car_name_id' => '1',
        ]);
        CarModel::create([
            'name' => 'Land Cruiser 200',
            'car_name_id' => '1',
        ]);
        CarModel::create([
            'name' => 'Land Cruiser 300',
            'car_name_id' => '1',
        ]);

        CarName::create([
            'name' => 'Lexus',
        ]);
        CarModel::create([
            'name' => 'RX 350',
            'car_name_id' => '2',
        ]);
        CarModel::create([
            'name' => 'LX 570',
            'car_name_id' => '2',
        ]);

        CarName::create([
            'name' => 'Volkswagen',
        ]);
        CarModel::create([
            'name' => 'ID 4',
            'car_name_id' => '3',
        ]);
        CarModel::create([
            'name' => 'Touareg',
            'car_name_id' => '3',
        ]);

        CarName::create([
            'name' => 'Tesla',
        ]);
        CarModel::create([
            'name' => 'X',
            'car_name_id' => '4',
        ]);

        CarName::create([
            'name' => 'Mercedes-Benz',
        ]);
        CarModel::create([
            'name' => 'G',
            'car_name_id' => '5',
        ]);
        CarModel::create([
            'name' => 'GLE',
            'car_name_id' => '5',
        ]);
        CarModel::create([
            'name' => 'S',
            'car_name_id' => '5',
        ]);

        CarName::create([
            'name' => 'Audi',
        ]);
        CarModel::create([
            'name' => 'Q7',
            'car_name_id' => '6',
        ]);
        CarModel::create([
            'name' => 'Q8',
            'car_name_id' => '6',
        ]);


        Car::create([
            'name' => 'Toyota',
            'model' => 'Camry',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2022',
            'price' => '30000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Toyota',
            'model' => 'Land Cruiser 200',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2023',
            'price' => '68000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Tesla',
            'model' => 'X',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2022',
            'price' => '30000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Mercedes-Benz',
            'model' => 'GLE',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2016',
            'price' => '40000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Mercedes-Benz',
            'model' => 'S',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2014',
            'price' => '36000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Mercedes-Benz',
            'model' => 'GLE',
            'description' => $testDescription,
            'color' => 'gray',
            'year' => '2016',
            'price' => '56000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Mercedes-Benz',
            'model' => 'G',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2012',
            'price' => '66000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Audi',
            'model' => 'Q7',
            'description' => $testDescription,
            'color' => 'gray',
            'year' => '2014',
            'price' => '26000',
            'user_id' => '2',
        ]);
        Car::create([
            'name' => 'Audi',
            'model' => 'Q8',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2014',
            'price' => '56000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Lexus',
            'model' => 'LX 570',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2017',
            'price' => '76000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Mercedes',
            'model' => 'S',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2022',
            'price' => '106000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Volkswagen',
            'model' => 'Touareg',
            'description' => $testDescription,
            'color' => 'white',
            'year' => '2024',
            'price' => '76000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Volkswagen',
            'model' => 'ID 4',
            'description' => $testDescription,
            'color' => 'white',
            'year' => '2024',
            'price' => '36000',
            'user_id' => '1',
        ]);
        Car::create([
            'name' => 'Toyota',
            'model' => 'Land Cruiser 300',
            'description' => $testDescription,
            'color' => 'black',
            'year' => '2025',
            'price' => '86000',
            'user_id' => '1',
        ]);


        for ($i = 1; $i <= 3; $i++) {
            Image::create([
                'name' => 'Toyota',
                'path' => 'CARS_TEST/car_1/' . $i . '.webp',
                'car_id' => '1',
            ]);
            Image::create([
                'name' => 'Toyota',
                'path' => 'CARS_TEST/car_2/' . $i . '.webp',
                'car_id' => '2',
            ]);
            Image::create([
                'name' => 'Tesla',
                'path' => 'CARS_TEST/car_3/' . $i . '.webp',
                'car_id' => '3',
            ]);
            Image::create([
                'name' => 'Mercedes-Benz',
                'path' => 'CARS_TEST/car_4/' . $i . '.webp',
                'car_id' => '4',
            ]);
            Image::create([
                'name' => 'Mercedes-Benz',
                'path' => 'CARS_TEST/car_5/' . $i . '.webp',
                'car_id' => '5',
            ]);
            Image::create([
                'name' => 'Mercedes-Benz',
                'path' => 'CARS_TEST/car_6/' . $i . '.webp',
                'car_id' => '6',
            ]);
            Image::create([
                'name' => 'Mercedes-Benz',
                'path' => 'CARS_TEST/car_7/' . $i . '.webp',
                'car_id' => '7',
            ]);
            Image::create([
                'name' => 'Audi',
                'path' => 'CARS_TEST/car_8/' . $i . '.webp',
                'car_id' => '8',
            ]);
            Image::create([
                'name' => 'Audi',
                'path' => 'CARS_TEST/car_9/' . $i . '.webp',
                'car_id' => '9',
            ]);
            Image::create([
                'name' => 'Lexus',
                'path' => 'CARS_TEST/car_10/' . $i . '.webp',
                'car_id' => '10',
            ]);
            Image::create([
                'name' => 'Mercedes',
                'path' => 'CARS_TEST/car_11/' . $i . '.webp',
                'car_id' => '11',
            ]);
            Image::create([
                'name' => 'Volkswagen',
                'path' => 'CARS_TEST/car_12/' . $i . '.webp',
                'car_id' => '12',
            ]);
            Image::create([
                'name' => 'Volkswagen',
                'path' => 'CARS_TEST/car_13/' . $i . '.webp',
                'car_id' => '13',
            ]);
            Image::create([
                'name' => 'Toyota',
                'path' => 'CARS_TEST/car_14/' . $i . '.webp',
                'car_id' => '14',
            ]);
        }
    }
}
