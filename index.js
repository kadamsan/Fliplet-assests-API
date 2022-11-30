const superagent = require('superagent');
var _ = require('lodash');

async function getAssets() {
  try {
      const res = await superagent
        .get('https://api.fliplet.com/v1/widgets/assets');
     
      // res.body, res.headers, res.status
      return res.body.assets;
    } catch(error) {
      // err.message, err.response
      throw new Error(error);
    }
}

function hasKeySetTo(obj,key,value)
{
    return obj.hasOwnProperty(key) && obj[key]==value;
}

async function parse(inputArray) {
  // @TODO
  // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
  // 		note: you may need to use a CORS proxy
  // 2. parse the inputArray into a list of assets using the above list

  console.log('inputArray ->', inputArray);
  let assets = await getAssets();
  //console.log('assests ->', assets);
  let assetsPicked = _.pick(assets, inputArray);
  // console.log('assests ->', assets.assets['bootstrap-css']);
  //console.log('assests ->', assetsPicked); 

  const map = new Map(Object.entries(assetsPicked));
  //console.log(map); 
  
  for (let [key, value] of map) {
    
    const mapVersion = new Map(Object.entries(value.versions));
    for (let [key, val] of mapVersion) {
      console.log(`${key}: ${val}`);
      console.log(_.isArray(val));
    }
    console.log('---------------');
    
  } 

  return Promise.resolve([]);
}


parse(['bootstrap', 'fliplet-core', 'moment', 'jquery', 'bootstrap-css']).then(function(assets) {
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