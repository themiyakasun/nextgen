import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

type Props = {
  session: Session | null;
  show: boolean;
};

const AccountInfo = ({ session, show }: Props) => {
  return (
    <div
      className={`${show ? 'block' : 'hidden'} absolute bg-white top-10 right-0 p-7 shadow-2xl z-20 w-[230px] after:absolute after:-top-2 after:right-2 after:w-0 after:h-0 after:border-l-5 after:border-r-5 after:border-r-transparent after:border-l-transparent after:border-b-10 after:border-b-white `}
    >
      <ul className='w-full text-left space-y-2'>
        {session?.user && (
          <li className='w-full s'>
            <Link href='/my-account' className='text-sm font-medium'>
              My Account
            </Link>
          </li>
        )}
        <li>
          <Link href='/wishlist' className='text-sm font-medium'>
            My Wishlist(0)
          </Link>
        </li>
        {session?.user ? (
          <li>
            <button className='text-sm font-medium' onClick={() => signOut()}>
              Sign out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href='/sign-up' className='text-sm font-medium'>
                Create an account
              </Link>
            </li>
            <li>
              <Link href='/sign-in' className='text-sm font-medium'>
                Sign in
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountInfo;
