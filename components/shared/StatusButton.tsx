import React from 'react';

type Props = {
  active: boolean;
  text: string;
};

const StatusButton = ({ active, text }: Props) => {
  return (
    <div
      className={`p-3 rounded-[10px] flex items-center justify-center text-sm font-medium w-max  ${active ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}`}
    >
      {text}
    </div>
  );
};

export default StatusButton;
