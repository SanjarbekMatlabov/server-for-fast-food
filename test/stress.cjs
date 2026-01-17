'use strict';

const autocannon = require('autocannon');

const CART_ID = '0c710230-6b50-477d-81bb-4558325b4e79';
const PRODUCT_ID = '00db7dcd-0afe-4296-9847-16e02e2303b4';
const BASE_URL = 'http://localhost:4000';

function runAddTest() {
  return new Promise((resolve) => {
    console.log('🚀 START ADD TEST');

    autocannon({
      url: `${BASE_URL}/api/add/${PRODUCT_ID}`,
      method: 'POST',
      connections: 100,
      duration: 10, 
      headers: {
        Cookie: `cartId=${CART_ID}`,
      },
    }, (err, result) => {
      if (err) console.error(err);
      console.log('✅ ADD TEST DONE');
      console.log(result);
      resolve();
    });
  });
}

function runDelTest() {
  return new Promise((resolve) => {
    console.log('🔥 START DEL TEST');

    autocannon({
      url: `${BASE_URL}/api/del/${PRODUCT_ID}`,
      method: 'POST',
      connections: 100,
      duration: 10, 
      headers: {
        Cookie: `cartId=${CART_ID}`,
      },
    }, (err, result) => {
      if (err) console.error(err);
      console.log('✅ DEL TEST DONE');
      console.log(result);
      resolve();
    });
  });
}

(async () => {
  await runAddTest();
  await runDelTest();
})();
