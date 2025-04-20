import React from 'react';

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 bg-white/40 backdrop-blur-sm flex items-center justify-center mt-18'>
      <video width='180' height='220' autoPlay loop muted playsInline>
        <source src='/icons/loader.webm' type='video/webm' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
