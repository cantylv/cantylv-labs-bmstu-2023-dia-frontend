import axios, { AxiosResponse } from 'axios';
import {
  getServicesProps,
  deleteServiceFromDraftProps,
  addServiceToDraftProps,
  filterServicesProps,
  getOneServiceProps,
} from '../interfaces';
import { mock_services } from '../mockData';
import { useDraftId, useServicesId } from '../store/slices/draftSlice';
import { useIsAuth } from '../store/slices/authSlice';

// Получение списка услуг
export const getServices = async (props: getServicesProps) => {
  try {
    let responseServices: AxiosResponse;
    if (!props.data.getParameters) {
      responseServices = await axios.get(`/api/v1/services/`);
    } else {
      responseServices = await axios.get(
        `/api/v1/services/?${props.data.getParameters}`
      );
    }
    props.setServices(responseServices.data.services);
    if (responseServices.data?.draft_id) {
      const draftId = useDraftId();
      if (!draftId) {
        props.setDraftId(responseServices.data.draft_id);
      }
      const responseDraft = await axios.get(`/api/v1/bids/${draftId}/`);
      props.setDraftServices(responseDraft.data.services); // список услуг с полями в заявке
    }
    return 0;
  } catch (error) {
    props.setServices(mock_services);
    console.error('Ошибка при запросе списка услуг:', error);
    return -1;
  }
};

// Получение услуги 
export const getOneService = async (props: getOneServiceProps) => {
  try {
    const response = await axios.get(`/api/v1/services/${props.serviceId}/`);
    props.setService(response.data);
  } catch (error) {
    if (typeof props.serviceId === 'string') {
      props.setService(mock_services[Number(props.serviceId) - 1]);
    } else {
      console.error('Идентификатор не определен', error);
    }
  }
};

// Удаление услуги из черновика пользователя
export const DeleteServiceFromDraft = async (
  props: deleteServiceFromDraftProps
) => {
  let isAuth = Boolean(localStorage.getItem('isAuth'));
  if (!isAuth) {
    window.alert('Для удаления услуги из заявки необходимо авторизоваться');
    return;
  }
  const servicesIdDraft: number[] = useServicesId();
  if (!servicesIdDraft.includes(props.data.serviceId)) {
    window.alert('Операция невозможна. Услуга не находится в заявке');
    return;
  }

  try {
    const draftId = useDraftId();
    const response = await axios.delete(
      `/api/v1/delete_service/${props.data.serviceId}/bids/${draftId}/`
    );
    props.setDraftServices(response.data.services);
  } catch (error) {
    console.error('Ошибка удаления услуги из черновика', error);
  }
};

// Добавление услуги в черновик
export const addServiceToDraft = async (props: addServiceToDraftProps) => {
  let isAuth = useIsAuth();
  if (!isAuth) {
    window.alert('Для добавления услуги в заявку необходимо авторизоваться');
    return;
  }
  try {
    // возвращает заявку с услугами
    const response = await axios.post(
      `/api/v1/services/add/${props.data.serviceId}/`,
      {}
    );
    if (!useDraftId()) {
      props.setDraftId(response.data.id);
    }
    props.setDraftServices(response.data.services);
  } catch (error) {
    console.error('Error ', error);
  }
};

// Фильтрация услуг
export const filterServices = async (props: filterServicesProps) => {
  let queryString: string = '';
  let params: URLSearchParams = new URLSearchParams();

  const searchText: string = props.data.searchText;
  const dateStart: string = props.data.dateStart;
  const dateEnd: string = props.data.dateEnd;
  const salaryStart: number = props.data.salaryStart;
  const salaryEnd: number = props.data.salaryEnd;

  // Добавляем параметр поиска, если текст поиска не пустой
  if (searchText.trim() !== '') {
    params.append('search', searchText.trim());
  }

  // Добавляем параметры даты, если они установлены
  if (dateStart) {
    params.append('date_start', dateStart);
  }
  if (dateEnd) {
    params.append('date_end', dateEnd);
  }
  if (!salaryStart) {
    params.append('salary_start', salaryStart.toString());
  }
  if (!salaryEnd) {
    params.append('salary_end', salaryEnd.toString());
  }

  // Получаем queryString для запроса списка услуг
  queryString += params.toString();
  const propsGetServices: getServicesProps = {
    data: {
      getParameters: queryString,
    },
    setServices: props.setServices,
    setDraftId: props.setDraftId,
    setDraftServices: props.setDraftServices,
  };
  const response: number = await getServices(propsGetServices);

  if (response === -1) {
    let filteredServices = mock_services;
    if (searchText) {
      filteredServices = filteredServices.filter(
        (service) => service.job.toLowerCase() === searchText.toLowerCase()
      );
    }
    if (dateStart) {
      filteredServices = filteredServices.filter(
        (service) => new Date(service.date_start) >= new Date(dateStart)
      );
    }
    if (dateEnd) {
      filteredServices = filteredServices.filter(
        (service) => new Date(service.date_start) <= new Date(dateEnd)
      );
    }
    if (salaryStart) {
      filteredServices = filteredServices.filter(
        (service) => service.salary >= salaryStart
      );
    }
    if (salaryEnd) {
      filteredServices = filteredServices.filter(
        (service) => service.salary <= salaryEnd
      );
    }
    props.setServices(filteredServices);
  }
};
