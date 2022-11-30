const axios = require('axios');

async function getAssests() {
  try {
    const config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    const response = await axios.get('https://api.fliplet.com/v1/widgets/assets', config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function parse(inputArray) {
  // @TODO
  // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
  // 		note: you may need to use a CORS proxy
  // 2. parse the inputArray into a list of assets using the above list

  let assests = await getAssests();
  console.log('assests ->', assests);

  return Promise.resolve([]);
}


parse(['bootstrap', 'fliplet-core', 'moment', 'jquery']).then(function(assets) {
  /*
   
   assets is expected to be an array with the
   following values in the same order as here:
   
   [
       "fonts/glyphicons-halflings-regular.ttf",
     "fonts/glyphicons-halflings-regular.woff",
     "fonts/glyphicons-halflings-regular.woff2",
     'bootstrap-css.bundle.css',
     'bootstrap-js.bundle.js',
     'jquery.js',
       'fliplet-core.bundle.css',
     'fliplet-core.bundle.js',
     'moment.min.js'
   ]
   
   */

  console.log('The list is', assets);
});