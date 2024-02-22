import { Bid, Service } from './interfaces';

export const bidInitialData: Bid = {
  id: 0,
  user: {
    id: 0,
    username: '',
    password: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
    last_login: '',
    date_joined: '',
  },
  moderator: {
    id: 0,
    username: '',
    password: '',
    is_staff: false,
    is_superuser: false,
    is_active: true,
    last_login: '',
    date_joined: '',
  },
  date_create: '',
  date_formation: '',
  date_finish: '',
  status: '',
  services: [],
};

export const serviceInitialData: Service = {
  id: 0,
  job: '',
  img: '',
  about: '',
  age: 14,
  sex: 'A',
  rus_passport: false,
  insurance: false,
  status: true,
  salary: 0,
  date_start: '',
  date_end: '',
};
