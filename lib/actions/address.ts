'use server';

import shippo from '../shippo';
import { db } from '@/database/drizzle';
import { addresses, userAddresses } from '@/database/schema';
import { and, eq } from 'drizzle-orm';

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

export const getUserShippingAddreses = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(userAddresses)
      .where(
        and(
          eq(userAddresses.userId, userId),
          eq(userAddresses.addressType, 'SHIPPING')
        )
      );

    const addressDetails = await Promise.all(
      result.map(async (item) => {
        const [address] = await db
          .select()
          .from(addresses)
          .where(eq(addresses.id, item.addressId as string));
        return address;
      })
    );

    return addressDetails;
  } catch (error) {
    console.log(error);
  }
};
