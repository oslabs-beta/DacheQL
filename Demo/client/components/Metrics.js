import React from 'react';

const Metrics = (props) =>{
  const { timeToFetch } = props;
  console.log('props' ,props);
  console.log('timetofetch',timeToFetch);
  return(
    <>
      <div>
      </div><div className='metrics-div'>
        <div className='metrics-grid'>
          <div className='timer-div'>
            <div className='metric-value'>Fetch Time: {Math.round(timeToFetch[1] * 100) / 100} ms</div>
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