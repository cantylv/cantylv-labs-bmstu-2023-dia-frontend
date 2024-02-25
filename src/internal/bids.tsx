import axios from 'axios';
import {
  getBidListProps,
  changeBidStatusProps,
  filterBidsProps,
  getBidDetailProps,
} from '../interfaces';

export const getBid = async (props: getBidDetailProps) => {
  try {
    props.setLoaded(true);
    const response = await axios.get(`/api/v1/bids/${props.data.bidId}/`);
    props.setBid(response.data);
    props.setBidServices(response.data.services);
  } catch (error) {
    console.log('Ошибка получения заявки', error);
  }
  props.setLoaded(false);
};

export const getBidList = async (props: getBidListProps) => {
  try {
    props.setLoaded(true);
    const response = await axios.get(`/api/v1/bids/`);
    props.setBids(response.data);
  } catch (error) {
    console.log('Ошибка при получении заявок', error);
  }
  props.setLoaded(false);
};

export const changeBidStatus = async (props: changeBidStatusProps) => {
  try {
    props.setLoaded(true);
    await axios.put(
      `/api/v1/bids/${props.data.bidId}/new_status/?status=${props.data.status}`
    );
  } catch (error) {
    console.log('Ошибка в изменении статуса заявки', error);
  }
  props.setLoaded(false);
};

export const filterBids = async (props: filterBidsProps) => {
  props.setLoaded(true);
  let queryString: string = '';
  let params: URLSearchParams = new URLSearchParams();

  const username: string = props.data.username;
  const dateStart: string = props.data.dateStart;
  const dateEnd: string = props.data.dateEnd;
  const bidStatus: string = props.data.status;

  // Добавляем параметр поиска, если текст поиска не пустой
  if (username.trim() !== '') {
    params.append('username', username.trim());
  }
  // Добавляем параметры даты, если они установлены
  if (dateStart) {
    params.append('date_start', dateStart);
  }
  if (dateEnd) {
    params.append('date_end', dateEnd);
  }
  if (bidStatus) {
    params.append('status', bidStatus.toString());
  }

  // Получаем queryString для запроса списка заявок
  queryString += params.toString();
  try {
    const response = await axios.get(`/api/v1/bids/?${queryString}`); // нужно добавить на беке фильтрацию по никнейму
    props.setBids(response.data);
  } catch (error) {
    console.log('Возникла ошибка при фильтрации заявок.');
  }
  props.setLoaded(false);
};
