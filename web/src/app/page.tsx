import Link from 'next/link';
import { gqlClient } from '@/lib/graphql-client';
import { GET_PRODUCTS } from '@/lib/queries';
import { formatBRL } from '@/lib/currency';

type APIProduct = {
  id: string;
  name: string;
  price_in_cents: number;
  image_url: string;
};

type GetProductsRes = {
  allProducts: APIProduct[];
  _allProductsMeta?: { count: number };
};

type SearchParams = { page?: string; perPage?: string };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const page = Number(sp?.page ?? 1);
  const perPage = Number(sp?.perPage ?? 12);

  const data = await gqlClient.request<GetProductsRes>(GET_PRODUCTS, {
    page,
    perPage,
  });

  const products = data.allProducts ?? [];
  const total = data._allProductsMeta?.count ?? products.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <main className='min-h-dvh p-6 md:p-10 bg-white'>
      <section className='mx-auto max-w-6xl'>
        <header className='flex items-end justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight'>
              Capputeeno
            </h1>
            <p className='mt-2 text-sm text-zinc-600'>Produtos ({total})</p>
          </div>
        </header>

        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map(p => (
            <li key={p.id} className='rounded-2xl border p-4 shadow-sm'>
              <Link href={`/product/${p.id}`} className='group block'>
                <img
                  src={p.image_url}
                  alt={p.name}
                  className='mb-3 h-48 w-full rounded-xl object-cover transition-transform group-hover:scale-[1.02]'
                />
                <div className='font-medium'>{p.name}</div>
                <div className='text-sm opacity-70'>
                  {formatBRL(p.price_in_cents)}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <nav className='mt-8 flex items-center justify-between'>
          <Link
            href={`/?page=${Math.max(1, page - 1)}&perPage=${perPage}`}
            className='rounded-xl border px-3 py-2 text-sm aria-disabled:opacity-50'
            aria-disabled={page <= 1}
          >
            ← Prev
          </Link>
          <span className='text-sm opacity-70'>
            Page {page} / {totalPages}
          </span>
          <Link
            href={`/?page=${Math.min(totalPages, page + 1)}&perPage=${perPage}`}
            className='rounded-xl border px-3 py-2 text-sm aria-disabled:opacity-50'
            aria-disabled={page >= totalPages}
          >
            Next →
          </Link>
        </nav>
      </section>
    </main>
  );
}
