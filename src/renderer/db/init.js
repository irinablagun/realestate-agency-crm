import { sequelize } from './';

export default function() {
  return sequelize.sync()
    // .then(() => require('./init_data').default())
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
}
