import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Car extends Entity {}

const schema = new Schema(
    Car,
    {
        make: { type: 'string' },
        model: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string' },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createCar(data: any) {
    await connect();

    const repository = client.fetchRepository(schema);

    const car = repository.createEntity(data);

    const id = await repository.save(car);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = client.fetchRepository(schema);

    await repository.createIndex();
}

export async function searchCars(q: string) {
    await connect();

    const repository = client.fetchRepository(schema);

    const cars = await repository
        .search()
        .where('make')
        .eq(q)
        .or('model')
        .eq(q)
        .or('description')
        .matches(q)
        .return.all();

    return cars;
}
