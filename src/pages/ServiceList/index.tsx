// Страница со списком, состоящим из карточек услуг
// Страница доступна всем пользователем

import { FC } from 'react';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ServiceCard from '../../components/card';
import ServiceFilterMenu from '../../components/serviceFilter';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';

import {
  addDraft,
  useDraftId,
  useDraftServices,
  useServicesId,
} from '../../store/slices/draftSlice';

// internal функции для работы с состояниями (удалению/добавление услуги в черновик, а также получение списка услуг)
import { getServices } from '../../internal/services';
import { Service, getServicesProps } from '../../interfaces';

const ListServicesPage: FC = () => {
  const dispatch = useDispatch(); // для того, чтобы менять состояние стора

  const [services, setServices] = useState<Service[]>([]); // список услуг, отображаемых на странице

  const draftId = useDraftId();
  const draftServicesId = useServicesId();
  const draftServices = useDraftServices();

  useEffect(() => {
    const props: getServicesProps = {
      data: {
        getParameters: '',
      },
      setServices: setServices,
    };
    getServices(props, dispatch);
  }, []);

  useEffect(() => {
    dispatch(
      addDraft({
        draftId: draftId,
        services: draftServices,
        servicesId: draftServicesId,
      })
    );
  }, [draftServices]);

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Виды деятельности', url: '/' },
  ];

  // необходимо добавить корзину
  return (
    <div className="container">
      <h1 className="main_header">Виды деятельности</h1>
      <div className="prompt_text">
        Более 200 видов деятельности и более тысячи заказчиков — предлагай свои
        услуги и согласовывай их с модератором. Выбирай комфортные условия и
        работай спокойно вместе с сервисом для внештатного персонала ПодJOBка!
      </div>

      <ServiceFilterMenu setServices={setServices} />

      <Breadcrumbs links={breadcrumbsLinks} />

      <div className="services">
        {services.map((item, index) => (
          <ServiceCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ListServicesPage;
