import React from 'react';

const Query = (props) =>{
  const {output} = props;

  const ob = '{';
  const cb = '}';
  const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  const eighted = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  const space = <span>&nbsp;</span>;
  
  if(output === 'Query For Valorant'){
    return(
      <div className = 'query-div'>
        <div className = 'queryLine'>{ob}</div>
        <div className = 'queryLine'>{space}{space}valorant{space} {ob}</div>
        <div className = 'queryLine'>{tab}id{space}</div>
        <div className = 'queryLine'>{tab}name</div>
        <div className = 'queryLine'>{tab}role</div>
        <div className = 'queryLine'>{tab}ultimate</div>
        <div className = 'queryLine'>{space}{space}{cb}</div>
        <div className = 'queryLine'>{cb}</div>
      </div>
      
    );
  }
  if(output === 'Query For Pokemon'){
    return(
      <div className = 'query-div'>
        <div className = 'queryLine'>{ob}</div>
        <div className = 'queryLine'>{space}{space}pokemon{space} {ob}</div>
        <div className = 'queryLine'>{tab}id{space}</div>
        <div className = 'queryLine'>{tab}name</div>
        <div className = 'queryLine'>{tab}type</div>
        <div className = 'queryLine'>{tab}ability</div>
        <div className = 'queryLine'>{space}{space}{cb}</div>
        <div className = 'queryLine'>{cb}</div>
      </div>
    );
  }
  if(output === 'Query For Cities'){
    return(
      <div className = 'query-div'>
        <div className = 'queryLine'>{ob}</div>
        <div className = 'queryLine'>{space}{space}cities{space} {ob}</div>
        <div className = 'queryLine'>{tab}id{space}</div>
        <div className = 'queryLine'>{tab}name</div>
        <div className = 'queryLine'>{tab}population</div>
        <div className = 'queryLine'>{tab}country_id</div>
        <div className = 'queryLine'>{space}{space}{cb}</div>
        <div className = 'queryLine'>{cb}</div>
      </div>
    );
  }
 
};

export default Query;