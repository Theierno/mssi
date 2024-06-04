"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Accordeon from '@/components/Accordeon';


export default function Home() {

  return (
    <main>
    <Header/>
    <Accordeon/>
    </main>

  );

}
