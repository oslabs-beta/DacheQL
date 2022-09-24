
const undacheable = {mutation: true, subscription: true};

async function DacheQL(endpoint, options) {
  if (!Object.hasOwn(options, 'body')) {
    await fetch(endpoint, options);
  }
  const { query } = JSON.parse(options.body); 
  //turning the query into an array at the start of object, and then removing the white space between 
  //where the bracket was and the property
  const operationType = query.split('{')[0].trim(); 
  if (Object.hasOwn(undacheable, operationType)) { // checking if undacheable is own property of operationType
    await fetch(endpoint, options);
  }

  const newOpts = { ...options, method: 'GET' };
 
  return new Promise((resolve, reject) => {
    fetch(endpoint, newOpts)
      .then((data) => {
        // Status 303 indicates that hash is not found in server cache
        // Upon receipt, send original request as follow-up
        if (data.status === 303) {
          fetch(endpoint, options)
            .then((res) => resolve(res))
            .catch((altErr) => reject(altErr));
        } else {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default DacheQL;
