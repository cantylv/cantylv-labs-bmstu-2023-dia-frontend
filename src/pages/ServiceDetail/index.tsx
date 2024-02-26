// Страница для просмотра услуги
// Страница доступна всем пользователям

import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';
import moment from 'moment'; // для преобразования DateTimeField в формат day hh:mm
import { Service } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { useServicesId, useDraftId } from '../../store/slices/draftSlice';
import {
  getOneServiceProps,
  deleteServiceFromDraftProps,
  addServiceToDraftProps,
} from '../../interfaces';
import { getOneService } from '../../internal/services';
import {
  deleteServiceFromDraft,
  addServiceToDraft,
} from '../../internal/services';

import LoadAnimation from '../../components/LoadAnimation';

const initialServiceData: Service = {
  id: -1,
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

const ServiceDetailPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUser = localStorage.getItem('isUser') == 'true';

  const { serviceId } = useParams(); // serviceId <- строка - значение идентификатора услуги

  const [service, setService] = useState<Service>(initialServiceData);

  const draftServicesId = useServicesId();
  const draftId = useDraftId(); // идентификатор черновика

  const [loaded, setLoaded] = useState(false);

  const btnDeleteHandler = async () => {
    const propsDelete: deleteServiceFromDraftProps = {
      serviceId: Number(serviceId),
      draftId: draftId,
    };
    deleteServiceFromDraft(propsDelete, dispatch);
  };

  const btnAddHandler = async () => {
    const propsAdd: addServiceToDraftProps = {
      serviceId: Number(serviceId),
    };
    addServiceToDraft(propsAdd, dispatch);
  };

  useEffect(() => {
    const propsService: getOneServiceProps = {
      serviceId: Number(serviceId),
      setService: setService,
      setLoaded: setLoaded,
    };
    getOneService(propsService);
  }, []);

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Виды деятельности', url: '/' },
    { label: service.job || '', url: `/services/${serviceId}/` },
  ];

  const handleButtonBackClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <Button className="btn-home" onClick={handleButtonBackClick}>
        Hазад
      </Button>

      <div className="serviceCardMenuNav">
        <Breadcrumbs links={breadcrumbsLinks} />
        {isUser && !draftServicesId.includes(Number(serviceId)) && (
          <div className="btnAddToDraft">
            <Button onClick={btnAddHandler}>Добавить в заявку</Button>
          </div>
        )}
        {isUser && draftServicesId.includes(Number(serviceId)) && (
          <div className="btnAddToDraft">
            <Button onClick={btnDeleteHandler}>Удалить из заявки</Button>
          </div>
        )}
      </div>

      <LoadAnimation loaded={loaded}>
        <div
          className={`card-service-page2 ${
            isUser &&
            draftServicesId &&
            draftServicesId.includes(Number(serviceId))
              ? 'inDraft'
              : ''
          }`}
        >
          <div className="card-service-img-page2">
            <img
              src={service.img}
              alt="employee"
              className="card-service-img-employee-page2"
            />
          </div>

          <div className="card-service-data">
            <div className="card-service-about-title">{service.job}</div>

            <div className="card-service-short-info-about card-title">
              Описание
            </div>
            <div className="card-service-short-info-about-ans card-title-ans">
              {service.about}
            </div>

            <div className="card-service-short-info-age card-title">
              Возрастные ограничения:
            </div>
            <div className="card-service-short-info-age-ans card-title-ans">
              {service.age}+
            </div>

            <div className="card-service-short-info-salary card-title">
              Заработная плата:
            </div>
            <div className="card-service-short-info-salary-ans card-title-ans">
              {service.salary}
            </div>

            <div className="card-service-short-info-sex card-title card-title">
              Пол:
            </div>
            <div className="card-service-short-info-sex-ans card-title-ans">
              {service.sex === 'A'
                ? 'Не важно'
                : service.sex === 'M'
                ? 'Мужской'
                : 'Женский'}
            </div>

            <div className="card-service-short-info-date-start card-title">
              Начало работы:
            </div>
            <div className="card-service-short-info-date-start-ans card-title-ans">
              {moment(service.date_start).format('MM/DD/YYYY в HH:mm')}
            </div>

            <div className="card-service-short-info-date-end card-title">
              Конец работы:
            </div>
            <div className="card-service-short-info-date-end-ans card-title-ans">
              {moment(service.date_end).format('MM/DD/YYYY в HH:mm')}
            </div>

            <div className="card-service-short-info-rus card-title">
              Наличие русского гражданства:
            </div>
            <div className="card-service-short-info-rus-ans card-title-ans">
              {service.rus_passport ? 'Необходимо' : 'Нет необходимости'}
            </div>

            <div className="card-service-short-info-ins card-title">
              Наличие медицинской страховки:
            </div>
            <div className="card-service-short-info-ins-ans card-title-ans title-last-ans">
              {service.insurance ? 'Необходимо' : 'Нет необходимости'}
            </div>
          </div>
        </div>
      </LoadAnimation>
    </div>
  );
};
export default ServiceDetailPage;
