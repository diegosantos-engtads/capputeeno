export default function Home() {
  return (
    <main className='min-h-dvh p-6 md:p-10 bg-white'>
      <section className='mx-auto max-w-6xl'>
        <h1 className='text-3xl font-semibold tracking-tight'>Capputeeno</h1>
        <p className='mt-2 text-sm text-zinc-600'>
          Boilerplate pronto com Next.js + Tailwind + GraphQL + Zustand.
        </p>

        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-2xl border p-4 shadow-sm'>
            <h2 className='font-medium'>Tailwind OK</h2>
            <p className='text-sm text-zinc-600'>
              Se você vê bordas e espaçamentos, Tailwind está funcionando.
            </p>
          </div>
          <div className='rounded-2xl border p-4 shadow-sm'>
            <h2 className='font-medium'>GraphQL client</h2>
            <p className='text-sm text-zinc-600'>
              Usaremos graphql-request em /lib.
            </p>
          </div>
          <div className='rounded-2xl border p-4 shadow-sm'>
            <h2 className='font-medium'>Zustand</h2>
            <p className='text-sm text-zinc-600'>
              Carrinho persistido em localStorage.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
