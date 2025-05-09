import React, { ReactNode } from 'react';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { auth } from '@/auth';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      <main className='root-container md:py-5 py-2'>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
