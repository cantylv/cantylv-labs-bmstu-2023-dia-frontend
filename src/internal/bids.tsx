import axios from 'axios';
import {
  getBidListProps,
  changeBidStatusProps,
  filterBidsProps,
  getBidDetailProps,
  deleteServiceFromDraftProps,
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
  props.setLoaded(false)
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
  let params = new URLSearchParams();

  // Добавляем параметр поиска, если текст поиска не пустой
  if (props.data.status.trim() !== '') {
    params.append('status', props.data.status.trim());
  }

  // Добавляем параметры юзернэйма, если они установлены
  if (props.data.startDate) {
    params.append('username', props.data.username);
  }

  // Добавляем параметры даты, если они установлены
  if (props.data.startDate) {
    const getParamDateStart = new Date(props.data.startDate);
    params.append('date_start', getParamDateStart.toISOString());
  }
  if (props.data.endDate) {
    const getParamDateEnd = new Date(props.data.endDate);
    params.append('date_end', getParamDateEnd.toISOString());
  }

  // Получаем queryString для запроса списка услуг
  queryString += params.toString();
  try {
    const response = await axios.get(`/api/v1/bids/?${queryString}`); // нужно добавить на беке фильтрацию по никнейму
    props.setBids(response.data);
  } catch (error) {
    console.log('Возникла ошибка при фильтрации заявок.');
  }
  props.setLoaded(false);
};


export const deleteServiceFromBid = (props: deleteServiceFromDraftProps) => async () => {
  try {
    const response = await axios.delete(
      `/api/v1/delete_service/${props.data.serviceId}/bids/${props.data.bidId}/`
    );
    props.setBidServices(response.data.services);
  } catch (error) {
    console.log('Ошибка в получении заявки', error);
  }
};