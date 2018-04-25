import models from './';

export default function() {
  return Promise.all([
    models.User.create({
      email: 'test@test.com',
      password: '123',
      fio: 'Благун Ирина Олеговна',
      group_id: 1,
    }),
    models.Group.create({
      name: 'Администратор',
    }),
    models.Stage.create({
      name: 'Открыта',
    }),
    models.Stage.create({
      name: 'Оплата',
    }),
    models.Stage.create({
      name: 'Завершена',
    }),
    models.Stage.create({
      name: 'Закрыта',
    })
  ]).then(function() {
    console.log('SQlLite init data');
  }).catch(function(err) {
    console.log(err)
  })
}
