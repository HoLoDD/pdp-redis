import { useState } from 'react';

interface CarProps {
    entityId: string;
    make: string;
    model: string;
}

export default function SearchForm() {
    //@ts-ignore
    const [hits, setHits] = useState<CarProps[]>([]);

    const search = async (event: any) => {
        const q = event.target.value;

        if (q.length > 2) {
            const params = new URLSearchParams({ q });

            const res = await fetch('/api/search?' + params);

            const result = await res.json();
            console.log(result);
            setHits(result['cars']);
        }
    };

    return (
        <div>
            <input onChange={search} type="text" />

            <ul>
                {hits.map((hit) => (
                    <li key={hit.entityId}>
                        {hit.make} {hit.model}
                    </li>
                ))}
            </ul>
        </div>
    );
}
