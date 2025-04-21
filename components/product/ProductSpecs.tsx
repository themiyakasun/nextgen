import React from 'react';

type Props = {
  specs: {
    id: string;
    specName: string;
    specValue: string;
    productId: string;
  }[];
};

const ProductSpecs = ({ specs }: Props) => {
  return (
    <table className='specs-table'>
      <tbody>
        {specs.map((spec) => (
          <tr key={spec.id}>
            <td>{spec.specName}</td>
            <td>{spec.specValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductSpecs;
