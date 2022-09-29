import React from 'react';

const Metrics = (props) =>{
  const { timeToFetch, cacheFetchTime } = props;
  //console.log('props' ,props);
  //console.log('timetofetch',timeToFetch);
  console.log('cache fetchTime', cacheFetchTime);
  return(
    <>
      <div>
      </div><div className='metrics-div'>
        <div className='metrics-grid'>
          <div className='timer-div'>
            <div className='metric-value'>Uncached Fetch Time: {Math.round(timeToFetch[1] * 100) / 100} ms</div>
          </div>
        </div>
        <div className='cache-cleared-div'>
                  Cached Runtime: {cacheFetchTime[0].toFixed(2)} ms
        </div>
      </div>
    </>
  );
};

export default Metrics;