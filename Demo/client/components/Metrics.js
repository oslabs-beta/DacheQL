import React from 'react';

const Metrics = () =>{
  return(
    <>
      <div>
      </div><div className='metrics-div'>
        <div className='metrics-grid'>
          <div className='timer-div'>
            <div className='metric-value'>Fetch Time:</div>
            <div className='metric-label'>Cache/Fetch Time</div>
          </div>
        </div>
        <div className='cache-cleared-div'>
                  Uncached Runtime: uncachedTime
        </div>
      </div>
    </>
  );
};

export default Metrics;