import axios, { AxiosResponse } from 'axios';
import {
  getServicesProps,
  deleteServiceFromDraftProps,
  addServiceToDraftProps,
  filterServicesProps,
  getOneServiceProps,
} from '../interfaces';
import {
  updateDraftId,
  updateDraftServices,
  updateServicesId,
} from '../store/slices/draftSlice';
import { mock_services } from '../mockData';
import { useDispatch } from 'react-redux';
import { Service } from '../interfaces';
import { Dispatch } from 'redux';

// получение массива идентификаторов услуг из массива услуг
const getNumberArrayOfServicesId = (serviceArray: Service[]) => {
  if (!serviceArray.length) {
    return [];
  }
  return serviceArray.map((service) => service.id);
};

// Получение списка услуг (либо отфильтрованного)
export const getServices = async (
  props: getServicesProps,
  dispatch: Dispatch<any>
) => {
  try {
    let responseServices: AxiosResponse;
    if (!props.data.getParameters) {
      responseServices = await axios.get(`/api/v1/services/`);
    } else {
      responseServices = await axios.get(
        `/api/v1/services/?${props.data.getParameters}`
      );
    }
    console.log(responseServices)
    props.setServices(responseServices.data.services);
    // если есть заявка-черновик, она придет в поле draft_id
    if (responseServices.data?.draft_id) {
      const newDraftId = responseServices.data.draft_id;
      dispatch(updateDraftId(newDraftId));
      // запрос на получение услуг, входящих в черновик
      const responseDraft = await axios.get(`/api/v1/bids/${newDraftId}/`);
      console.log(responseDraft)
      dispatch(updateDraftServices(responseDraft.data.services)); // список услуг с полями в заявке

      const arrayServiceId = getNumberArrayOfServicesId(
        responseDraft.data.services
      );
      dispatch(updateServicesId(arrayServiceId)); // список услуг с полями в заявке
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
      props.setService(mock_services[0]);
    } else {
      console.error('Идентификатор не определен', error);
    }
  }
};

// Удаление услуги из черновика пользователя
export const DeleteServiceFromDraft = async (
  props: deleteServiceFromDraftProps,
  dispatch: Dispatch<any>
) => {
  try {
    const response = await axios.delete(
      `/api/v1/delete_service/${props.serviceId}/bids/${props.draftId}/`
    );
    dispatch(updateDraftServices(response.data.services));

    const arrayServiceId = getNumberArrayOfServicesId(response.data.services);
    dispatch(updateServicesId(arrayServiceId));
  } catch (error) {
    console.error('Ошибка удаления услуги из черновика', error);
  }
};

// Добавление услуги в черновик
export const addServiceToDraft = async (props: addServiceToDraftProps) => {
  const dispatch = useDispatch();
  try {
    // возвращает заявку с услугами
    const response = await axios.post(
      `/api/v1/services/add/${props.serviceId}/`,
      {}
    );
    dispatch(updateDraftId(response.data.id));

    dispatch(updateDraftServices(response.data.services));

    const arrayServiceId = getNumberArrayOfServicesId(response.data.services);
    dispatch(updateServicesId(arrayServiceId));
  } catch (error) {
    console.error('Error ', error);
  }
};

// Фильтрация услуг
export const filterServices = async (
  props: filterServicesProps,
  dispatch: Dispatch<any>
) => {
  let queryString: string = '';
  let params: URLSearchParams = new URLSearchParams();

  const searchText: string | undefined= props.data.searchText;
  const dateStart: string | undefined = props.data.dateStart;
  const dateEnd: string | undefined = props.data.dateEnd;
  const salaryStart: number | undefined = props.data.salaryStart;
  const salaryEnd: number | undefined= props.data.salaryEnd;

  // Добавляем параметр поиска, если текст поиска не пустой
  if (searchText && searchText.trim() !== '') {
    params.append('search', searchText.trim());
  }

  // Добавляем параметры даты, если они установлены
  if (dateStart) {
    params.append('date_start', dateStart);
  }
  if (dateEnd) {
    params.append('date_end', dateEnd);
  }
  if (salaryStart) {
    params.append('salary_start', salaryStart.toString());
  }
  if (salaryEnd) {
    params.append('salary_end', salaryEnd.toString());
  }

  // Получаем queryString для запроса списка услуг
  queryString += params.toString();
  console.log(queryString)
  const propsGetServices: getServicesProps = {
    data: {
      getParameters: queryString,
    },
    setServices: props.setServices,
  };
  const response: number = await getServices(propsGetServices, dispatch);

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
