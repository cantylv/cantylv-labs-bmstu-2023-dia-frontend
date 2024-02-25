import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import {
  deleteServiceFromDraftProps,
  addServiceToDraftProps,
  ServiceCardProps,
} from '../../interfaces';
import {
  deleteServiceFromDraft,
  addServiceToDraft,
} from '../../internal/services';
import { useIsUser } from '../../store/slices/authSlice';
import { useDraftId, useServicesId } from '../../store/slices/draftSlice';
import { useDispatch } from 'react-redux';

const ServiceCard: FC<ServiceCardProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const servicesIdDraft = useServicesId();
  const draftId = useDraftId();

  const isUser = useIsUser();

  const handleButtonInfoClick = () => {
    navigate(`/services/${props.data.id}/`);
  };

  const btnDeleteHandler = async () => {
    const propsDelete: deleteServiceFromDraftProps = {
      serviceId: props.data.id,
      draftId: draftId,
    };
    console.log(propsDelete);
    deleteServiceFromDraft(propsDelete, dispatch);
  };

  const btnAddHandler = async () => {
    const propsAdd: addServiceToDraftProps = {
      serviceId: props.data.id,
    };
    console.log(propsAdd)
    addServiceToDraft(propsAdd, dispatch);
  };

  return (
    <div className={`card-service ${isUser && servicesIdDraft && servicesIdDraft.includes(props.data.id) ? 'inDraft': ''}`}>
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
          Необходимый возраст
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
          className="card-service-btn-info"
          onClick={handleButtonInfoClick}
        >
          Подробнее
        </Button>
        {isUser &&
          servicesIdDraft &&
          servicesIdDraft.includes(props.data.id) && (
            <Button
              className="card-service-btn-delete"
              onClick={btnDeleteHandler}
            >
              Удалить из заявки
            </Button>
          )}
        {isUser &&
          servicesIdDraft &&
          !servicesIdDraft.includes(props.data.id) && (
            <Button className="card-service-btn-delete" onClick={btnAddHandler}>
              Добавить в заявку
            </Button>
          )}
      </div>
    </div>
  );
};

export default ServiceCard;
