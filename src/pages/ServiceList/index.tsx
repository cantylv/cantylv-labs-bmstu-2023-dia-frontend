// Страница со списком, состоящим из карточек услуг
// Страница доступна всем пользователем

import { FC } from 'react';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ServiceCard from '../../components/card';
import ServiceFilterMenu from '../../components/serviceFilter';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';

// internal функции для работы с состояниями (удалению/добавление услуги в черновик, а также получение списка услуг)
import { getServices } from '../../internal/services';
import { Service, getServicesProps } from '../../interfaces';
import LoadAnimation from '../../components/LoadAnimation';

const ListServicesPage: FC = () => {
  const dispatch = useDispatch(); // для того, чтобы менять состояние стора

  const [loaded, setLoaded] = useState<boolean>(false);

  const [services, setServices] = useState<Service[]>([]); // список услуг, отображаемых на странице

  useEffect(() => {
    const props: getServicesProps = {
      data: {
        getParameters: '',
      },
      setServices: setServices,
      setLoaded: setLoaded,
    };
    getServices(props, dispatch);
  }, []);

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

      <LoadAnimation loaded={loaded}>
        <div className="services">
          {services.map((item, index) => (
            <ServiceCard key={index} data={item} />
          ))}
        </div>
      </LoadAnimation>
    </div>
  );
};

export default ListServicesPage;
