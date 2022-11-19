import { searchCars } from '../../lib/redis';

export default async function handler(req: any, res: any) {
    const q = req.query.q;
    const cars = await searchCars(q);
    res.status(200).json({ cars });
}
