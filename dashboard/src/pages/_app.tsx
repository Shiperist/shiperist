import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import React, { Suspense } from 'react';
import { DevSupport } from '@react-buddy/ide-toolbox-next';
import { ComponentPreviews, useInitial } from '~/components/dev';
import Navbar from '~/components/navbar/navbar.component';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <main
        className="h-full cat-mocha bg-cat-base"
        style={{ minHeight: '100vh' }}
      >
        <Suspense>
          <Navbar />
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
