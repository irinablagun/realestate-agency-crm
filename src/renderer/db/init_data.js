const CategoryModel = require('./models/category');
const ProductModel = require('./models/product');
const UserModel = require('./models/user');
const ClientModel = require('./models/client');
const ParamModel = require('./models/param');

export default function() {
  return Promise.all([
    UserModel.create({
      email: 'test@test.com',
      password: '123',
      fn: 'Irina',
      ln: 'Blagun',
    }),
    ClientModel.create({
      name: 'clientt',
      desc: '123',
      delete: 0
    })
  ]).then(function() {
    console.log('SQlLite init data');
  }).catch(function(err) {
    console.log(err)
  })
}
