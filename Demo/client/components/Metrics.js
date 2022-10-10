import React from 'react';

const Metrics = (props) => {
  const { timeToFetch, cacheFetchTime } = props;
  //console.log('props' ,props);
  //console.log('timetofetch',timeToFetch);
  console.log('cache fetchTime', cacheFetchTime);
  return (
    <>
      <div className="metrics-div">
        <div className="metrics-grid">
          <div className="timer-div">
            <div className="metric-value">
              Uncached Fetch Time: <a>{Math.round(timeToFetch[1] * 100) / 100} ms</a>
            </div>
          </div>
        </div>
        <div className="cache-cleared-div">
          Cached Runtime: <a>{cacheFetchTime[0].toFixed(1)} ms</a>
        </div>
      </div>
    </>
  );
};

export default Metrics;
