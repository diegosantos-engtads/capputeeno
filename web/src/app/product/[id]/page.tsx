import { notFound } from 'next/navigation';
import { gqlClient } from '@/lib/graphql-client';
import { GET_PRODUCT } from '@/lib/queries';
import { formatBRL } from '@/lib/currency';
import { AddToCart } from '@/components/add-to-cart';

type Product = {
  id: string;
  name: string;
  description: string;
  price_in_cents: number;
  image_url: string;
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await gqlClient.request<{ Product: Product }>(GET_PRODUCT, {
    id: params.id,
  });

  const product = data?.Product;
  if (!product) return notFound();

  return (
    <main className='min-h-dvh p-6 md:p-10 bg-white'>
      <section className='mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className='w-full rounded-2xl border object-cover'
          />
        </div>

        <div>
          <h1 className='text-3xl font-semibold tracking-tight'>
            {product.name}
          </h1>
          <div className='mt-2 text-lg text-zinc-700'>
            {formatBRL(product.price_in_cents)}
          </div>
          <p className='mt-4 text-sm leading-relaxed text-zinc-700'>
            {product.description}
          </p>

          <AddToCart product={product} />
        </div>
      </section>
    </main>
  );
}
