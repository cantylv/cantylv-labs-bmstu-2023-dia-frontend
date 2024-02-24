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
  useServicesId,
} from '../../store/slices/draftSlice';

// internal функции для работы с состояниями (удалению/добавление услуги в черновик, а также получение списка услуг)
import { getServices } from '../../internal/services';
import { Service, getServicesProps } from '../../interfaces';

const ListServicesPage: FC = () => {
  const dispatch = useDispatch(); // для того, чтобы менять состояние стора

  const [services, setServices] = useState<Service[]>([]); // список услуг, отображаемых на странице

  const [draftId, setDraftId] = useState(useDraftId()); // идентификатор черновика
  // список идентификаторов услуг в черновике (для красивого отображения услуг, находящихся в черновике)
  const [draftServicesId, setDraftServicesId] = useState<number[]>(
    useServicesId()
  );
  const [draftServices, setDraftServices] = // список услуг в черновике (с полями)
    useState<Service[]>([]);

  const getNumberArrayOfServicesId = (serviceArray: Service[]) => {
    if (!serviceArray.length) {
      return [];
    }
    return serviceArray.map((service) => service.id);
  };

  useEffect(() => {
    const props: getServicesProps = {
      data: {
        getParameters: '',
        draftId: draftId,
      },
      setServices: setServices,
      setDraftId: setDraftId,
      setDraftServices: setDraftServices,
    };
    getServices(props);
  }, []);

  useEffect(() => {
    setDraftServicesId(getNumberArrayOfServicesId(draftServices));
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

      <ServiceFilterMenu
        setServices={setServices}
        setDraftServices={setDraftServices}
        setDraftId={setDraftId}
      />

      <Breadcrumbs links={breadcrumbsLinks} />

      <div className="services">
        {services.map((item, index) => (
          <ServiceCard
            key={index}
            data={item}
            setDraftServices={setDraftServices} // поменять кол-во услуг в черновике
            setDraftId={setDraftId}
          />
        ))}
      </div>
    </div>
  );
};

export default ListServicesPage;
