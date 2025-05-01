'use server';

import { Session } from 'next-auth';
import shippo from '../shippo';

export const addressCreation = async (
  addressData: Address,
  session: Session | null
) => {
  const { firstName, lastName, state, street, country, city, postalCode } =
    addressData;

  try {
    if (session === null) throw new Error('user is emtpy');

    const result = await shippo.addresses.create({
      name: `${firstName} ${lastName}`,
      company: '',
      street1: street,
      city,
      state,
      zip: postalCode,
      country,
      email: session.user?.email as string,
      validate: true,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addressValidation = async (id: string) => {
  const result = await shippo.addresses.validate(id);
  return result;
};
