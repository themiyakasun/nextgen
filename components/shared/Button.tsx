import Link from 'next/link';

type Props = {
    variant: 'primary' | 'outline' | 'link';
    type?: 'submit' | 'button';
    color: 'white' | 'default';
    customStyle?: string;
    link?: string;
    text: string;

};

const Button = ({variant, type, color, customStyle, link, text}: Props) => {
    let style = `${customStyle} text-sm font-semibold flex items-center justify-center w-full py-2 px-[26px]`;

    if(variant === 'primary'){}

    if(variant === 'outline'){
        style += ` border-2 rounded-[50px] ${color === 'white' ? 'border-white text-white' : 'border-primary text-primary'}`;
    }

    return (
        link ? (
            <Link href={link ? link : '/'} className={style}>{text}</Link>
        ): (
            <button type={type} className={style}>{text}</button>
        )
    );
};
export default Button;
