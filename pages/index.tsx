import Head from 'next/head';
import Image from 'next/image';
import CarForm from '../lib/car-form';
import SearchForm from '../lib/search-from';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <>
            <SearchForm />
            <CarForm />
        </>
    );
}
