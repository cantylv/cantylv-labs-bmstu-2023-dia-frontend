import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import {
  deleteServiceFromDraftProps,
  addServiceToDraftProps,
  ServiceCardProps,
} from '../../interfaces';
import {
  useDraftId,
  useDraftServices,
  useServicesId,
} from '../../store/slices/draftSlice';
import {
  DeleteServiceFromDraft,
  addServiceToDraft,
} from '../../internal/services';

const ServiceCard: FC<ServiceCardProps> = (props) => {
  const navigate = useNavigate();
  const [servicesIdDraft] = useState<number[]>(useServicesId()); // список id услуг в черновике

  const handleButtonInfoClick = () => {
    navigate(`/services/${props.data.id}/`);
  };

  const btnDeleteHandler = async () => {
    const propsDelete: deleteServiceFromDraftProps = {
      data: {
        serviceId: props.data.id,
        bidId: useDraftId(),
        bidServices: useDraftServices(),
      },
      setBidServices: props.setDraftServices,
    };
    DeleteServiceFromDraft(propsDelete);
  };

  const btnAddHandler = async () => {
    const propsAdd: addServiceToDraftProps = {
      data: {
        serviceId: props.data.id,
      },
      setDraftServices: props.setDraftServices,
      setDraftId: props.setDraftId,
    };
    addServiceToDraft(propsAdd);
  };

  return (
    <div className="card-service">
      <div className="card-service-img">
        {
          <img
            alt="employee"
            className="card-service-img-employee"
            src={props.data.img}
          />
        }
      </div>

      <div className="card-service-small-data">
        <div className="card-service-about-title">{props.data.job}</div>

        <div className="card-service-short-info-age card-title">
          Необходимый возраст:
        </div>
        <div className="card-service-short-info-age-ans card-title-ans">
          {props.data.age}+
        </div>

        <div className="card-service-short-info-salary card-title">
          Зарплата
        </div>
        <div className="card-service-short-info-salary-ans card-title-ans">
          {props.data.salary} RUB
        </div>

        <div className="card-service-short-info-time-start card-title">
          Начало работы
        </div>
        <div className="card-service-short-info-time-start-ans card-title-ans">
          {moment(props.data.date_start).format('MM/DD/YYYY в HH:mm')}
        </div>

        <div className="card-service-short-info-time-end card-title">
          Конец работы
        </div>
        <div className="card-service-short-info-time-end-ans card-title-ans">
          {moment(props.data.date_end).format('MM/DD/YYYY в HH:mm')}
        </div>
      </div>

      <div className="btns">
        <Button
          className="card-service-btn-info btn"
          onClick={handleButtonInfoClick}
        >
          Подробнее
        </Button>
        {servicesIdDraft.includes(props.data.id) && (
          <Button
            className="card-service-btn-delete btn"
            onClick={btnDeleteHandler}
          >
            Удалить из заявки
          </Button>
        )}
        {!servicesIdDraft.includes(props.data.id) && (
          <Button
            className="card-service-btn-delete btn"
            onClick={btnAddHandler}
          >
            Добавить в заявку
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
