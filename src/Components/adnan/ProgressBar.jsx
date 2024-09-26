import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const ProgressBar = () => {
  const ref = useRef(null);

  const startProgressBar = () => {
    ref.current.continuousStart()
  }

  const completeProgressBar = () => {
    ref.current.complete()
  }


  return (
    <div>
      {/* Top Loading Bar */}
      <LoadingBar color='#279EDA' ref={ref} height={2} className='shadow-2xl'/>
      <button onClick={startProgressBar} className='mr-10'>
        Start Continuous Loading Bar
      </button>
      {/* <button onClick={() => ref.current.staticStart()} className='mr-10'>
        Start Static Loading Bar
      </button> */}
      <button onClick={completeProgressBar} className='mr-10'>Complete</button>
      <br />
    </div>
  );
};

export default ProgressBar;
