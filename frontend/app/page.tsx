'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Carregando...</p>;

  if (!session) {
    return (
      <div>
        <h1>Não logado</h1>
        <button onClick={() => signIn('google')}>
          Login com Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Logado</h1>
      <p>{session.user?.email}</p>
      <button onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
