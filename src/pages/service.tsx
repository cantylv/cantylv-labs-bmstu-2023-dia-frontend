import { FC, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Breadcrumbs, { BreadcrumbLink } from '../components/breadcrumb';
import { mock_services } from '../mockData'
import { Service } from "../mockData";
import moment from 'moment' // для преобразования DateTimeField в формат day hh:mm


const DetailsPage: FC = () => {
  const navigate = useNavigate();
  const { service_id } = useParams();
  const [service, setService] = useState<Service>({ id: -1, job: '', age: 14, salary: 0, date_start: ' ', date_end: ' ' });

  useEffect(() => {
    fetch(`/api/v1/services/${service_id}/`)
      .then((response) => response.json())
      .then((jsonData) => setService(jsonData))
      .catch((error) => {
        if (typeof service_id === 'string') {
          setService(mock_services[parseInt(service_id) - 1]);
        } else {
          console.error('Идентификатор не определен');
        }
        console.error('Ошибка запроса данных:', error)
      });
  }, []);

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Список услуг', url: '/labs-bmstu-2023-dia-frontend/' },
    { label: service.job || '', url: `/labs-bmstu-2023-dia-frontend/services/${service_id}` },
  ];

  const handleButtonBackClick = () => {
    navigate('/');
  }

  return (

    <div className="container">
      <Link to="/labs-bmstu-2023-dia-frontend/">
        <Button className="btn-home btn" onClick={handleButtonBackClick}>Hазад</Button>
      </Link>

      <Breadcrumbs links={breadcrumbsLinks} />

      <div className="card-service-page2">

        <div className="card-service-img-page2">
          <img src={service.img} alt="employee" className="card-service-img-employee-page2" />
        </div>

        <div className="card-service-data">
          <div className="card-service-about-title">{service.job}</div>

          <div className="card-service-short-info-about card-title">Описание</div>
          <div className="card-service-short-info-about-ans card-title-ans">{service.about}</div>

          <div className="card-service-short-info-age card-title">Возрастные ограничения:</div>
          <div className="card-service-short-info-age-ans card-title-ans">{service.age}+</div>

          <div className="card-service-short-info-salary card-title">Заработная плата:</div>
          <div className="card-service-short-info-salary-ans card-title-ans">{service.salary}</div>

          <div className="card-service-short-info-sex card-title card-title">Пол:</div>
          <div className="card-service-short-info-sex-ans card-title-ans">
            {service.sex === 'A' ? 'Не важно' : service.sex === 'M' ? 'Мужской' : 'Женский'}
          </div>

          <div className="card-service-short-info-date-start card-title">Начало работы:</div>
          <div className="card-service-short-info-date-start-ans card-title-ans">{moment(service.date_start).format('MM/DD/YYYY в HH:mm')}</div>

          <div className="card-service-short-info-date-end card-title">Конец работы:</div>
          <div className="card-service-short-info-date-end-ans card-title-ans">{moment(service.date_end).format('MM/DD/YYYY в HH:mm')}</div>

          <div className="card-service-short-info-rus card-title">Наличие русского гражданства:</div>
          <div className="card-service-short-info-rus-ans card-title-ans">
            {service.rus_passport ? "Необходимо" : "Нет необходимости"}
          </div>

          <div className="card-service-short-info-ins card-title">Наличие медицинской страховки:</div>
          <div className="card-service-short-info-ins-ans card-title-ans title-last-ans">
            {service.insurance ? "Необходимо" : "Нет необходимости"}
          </div>
        </div>
      </div>
    </div>






  )
}
export default DetailsPage