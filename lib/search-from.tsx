import { useState } from 'react';

interface CarProps {
    entityId: string;
    make: string;
    model: string;
}

export default function SearchForm() {
    //@ts-ignore
    const [hits, setHits] = useState<CarProps[]>([]);

    console.log(hits);

    const search = async (event: any) => {
        const q = event.target.value;

        if (q.length > 0) {
            const params = new URLSearchParams({ q });

            const res = await fetch('/api/search?' + params);

            const result = await res.json();
            console.log(result);
            setHits(result['cars']);
        }
    };

    return (
        <div>
            <h1 style={{ height: '0', textAlign: 'center' }}>Search</h1>
            <input
                onChange={search}
                type="text"
                style={{
                    width: '100%',
                    height: '30px',
                    margin: '50px auto',
                    display: 'flex',
                }}
            />

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
