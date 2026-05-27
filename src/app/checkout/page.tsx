'use client';

import Checkout from '@/components/Checkout';
import { useRouter } from 'next/navigation';

export default function PaginaCompra() {
  const router = useRouter();

  // Função para voltar para a Home
  const handleVoltar = () => {
    router.push('/');
  };

  return (
    <main>
      <Checkout movieTitle="Duna: Parte 2" onBack={handleVoltar} />
    </main>
  );
}