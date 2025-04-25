import { SvgIconProps } from '@mui/material';
import Link from 'next/link';
import { JSX } from 'react';

type Props = {
  variant: 'primary' | 'outline' | 'link';
  type?: 'submit' | 'button';
  color: 'white' | 'default';
  customStyle?: string;
  link?: string;
  text: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

const Button = ({
  variant,
  type,
  color,
  customStyle,
  link,
  text,
  leftIcon,
  rightIcon,
}: Props) => {
  let style = `${customStyle} text-xs md:text-sm font-semibold flex items-center ${leftIcon || rightIcon ? 'gap-2' : ''} justify-center md:w-full py-2 px-4 md:px-[26px] rounded-[50px]`;

  if (variant === 'primary') {
    style += ` bg-primary-custom text-white`;
  }

  if (variant === 'outline') {
    style += ` border-2  ${color === 'white' ? 'border-white text-white' : 'border-primary-custom text-primary-custom'}`;
  }

  return link ? (
    <Link href={link ? link : '/'} className={style}>
      {leftIcon}
      {text}
      {rightIcon}
    </Link>
  ) : (
    <button type={type} className={style}>
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  );
};
export default Button;
