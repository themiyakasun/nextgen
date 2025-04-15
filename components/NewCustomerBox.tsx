import Button from "@/components/shared/Button";

type Props = {
    type: 'SIGN_IN' | 'SIGN_UP';
};

const NewCustomerBox = ({type}: Props) => {
    const isSignedIn = type === 'SIGN_IN';
    return (
        <div className='bg-accent-1 md:p-10 p-5 md:mt-0 mt-5'>
            <h2 className='sub-title'>{isSignedIn ? 'New Customer?' : 'Already have an account?'}</h2>

            <p className='md:text-sm text-xs font-light my-5'>{isSignedIn ? 'Creating an account has many benefits: ' : 'You already have and premium experience. Please sign in'}</p>

            {isSignedIn && (
                <ul className='list-disc mb-5'>
                    <li className='md:text-sm text-xs font-light mb-2'>Check out faster</li>
                    <li className='md:text-sm text-xs font-light mb-2'>Keep more than one address</li>
                    <li className='md:text-sm text-xs font-light mb-2'>Track orders and more</li>
                </ul>
            )}
            <div className='flex'>
               <div>
                   <Button variant={'primary'} color={'default'} text={isSignedIn ? 'Create an account' : 'Sign in'} link={isSignedIn ? '/sign-up' : '/sign-in'} />
               </div>
            </div>
        </div>
    );
};

export default NewCustomerBox;