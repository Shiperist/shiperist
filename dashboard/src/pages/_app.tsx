import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import React, { Suspense } from 'react';
import Nav from '~/components/navbar/nav.component';
import { DevSupport } from '@react-buddy/ide-toolbox-next';
import { ComponentPreviews, useInitial } from '~/components/dev';
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <main className="h-full bg-gray-100" style={{ minHeight: '100vh' }}>
        <Suspense>
          <Nav />
        </Suspense>
        <DevSupport
          ComponentPreviews={ComponentPreviews}
          useInitialHook={useInitial}
        >
          <Component {...pageProps} />
        </DevSupport>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
