'use client';

import { useCart } from '@/store/cart';

type ProductLite = {
  id: string;
  name: string;
  price_in_cents: number;
  image_url: string;
};

export function AddToCart({ product }: { product: ProductLite }) {
  const add = useCart(s => s.add);

  return (
    <button
      onClick={() =>
        add(
          {
            id: product.id,
            name: product.name,
            priceInCents: product.price_in_cents,
            imageUrl: product.image_url,
          },
          1,
        )
      }
      className='mt-4 rounded-xl border bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800'
    >
      Add to cart
    </button>
  );
}
