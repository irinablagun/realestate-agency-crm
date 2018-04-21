import * as db from './index.js';

export default function() {
  return Promise.all(
    [
      ...db
    ].map((m) => m.sync())
  )
    .then(() => {
      console.log('SQlLite initialize models');
    })
    .then(() => require('./init_data').default())
    .catch((err) => {
      console.log(err);
    });
}
