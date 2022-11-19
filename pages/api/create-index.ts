import { createIndex } from '../../lib/redis';

export default async function handler(req: Request, res: any) {
    await createIndex();
    res.status(200).send('ok');
}
