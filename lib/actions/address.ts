'use server';

import shippo from '../shippo';
import { db } from '@/database/drizzle';
import { addresses, userAddresses } from '@/database/schema';

export const addressCreation = async (addressData: Address, userId: string) => {
  const { state, street, country, city, postalCode } = addressData;

  try {
    // const result = await shippo.addresses.create({
    //   name: `${firstName} ${lastName}`,
    //   company: '',
    //   street1: street,
    //   city,
    //   state,
    //   zip: postalCode,
    //   country,
    //   email: session.user?.email as string,
    //   validate: true,
    // });

    const address = await db
      .insert(addresses)
      .values({
        street,
        city,
        state,
        postalCode,
        country,
      })
      .returning();

    if (address.length > 0) {
      await db.insert(userAddresses).values({
        userId: userId,
        addressId: address[0].id,
      });

      return { success: true, address: address };
    } else {
      return { success: false, error: 'No address can be found' };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};

export const addressValidation = async (id: string) => {
  const result = await shippo.addresses.validate(id);
  return result;
};
