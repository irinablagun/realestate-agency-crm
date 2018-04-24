import moment from 'moment';
moment.locale('ru');

export const createdDate = (created_date) => moment(created_date).format('LL');