// Страница с таблицой заявок
// Страница доступна только авторизованному пользователю

import Breadcrumbs, {
  BreadcrumbLink,
} from '../../components/breadcrumb/index.tsx';
import moment from 'moment';

import { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import LoadAnimation from '../../components/LoadAnimation/index.tsx';

import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import {
  Service,
  getServicesProps,
  deleteServiceProps,
} from '../../interfaces.tsx';

import Container from 'react-bootstrap/Container';

import { useDispatch } from 'react-redux';

import ServiceFilterMenu from '../../components/serviceFilter/index.tsx';
import { deleteService, getServices } from '../../internal/services.tsx';
import Row from 'react-bootstrap/Row';

const ServiceTablePage = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState<Service[]>([]);

  const [loaded, setLoaded] = useState<boolean>(false); // загрузка
  const navigate = useNavigate();

  const returnRightStringDate = (dateString: string | null) => {
    if (dateString) {
      const date = new Date(dateString);
      return moment(date).format('MM/DD/YYYY');
    } else {
      return '';
    }
  };

  const btnChangeInfo = (serviceId: number) => {
    navigate(`/services/${serviceId}/edit/`)
  }

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

  let breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Редактирование видов деятельности', url: '/services/edit/' },
  ];

  const btnDeleteHandler = async (serviceId: number) => {
    const propsDelete: deleteServiceProps = {
      data: {
        serviceId: serviceId,
      },
      setServices: setServices,
    };
    deleteService(propsDelete).then(() => {
      const props: getServicesProps = {
        data: {
          getParameters: '',
        },
        setServices: setServices,
        setLoaded: setLoaded,
      };
      getServices(props, dispatch);
    });
  };

  return (
    <Container className="bids">
      <div>
        <Breadcrumbs links={breadcrumbsLinks} />
        <Button onClick={() => navigate('/services/new/')}>Создать услугу</Button>
      </div>
      

      <ServiceFilterMenu setServices={setServices} setLoaded={setLoaded}/>

      <LoadAnimation loaded={loaded}>
        <Table bordered hover responsive className="servicesTable">
          <thead>
            <tr>
              <th className="text-center align-middle">Название</th>
              <th className="text-center align-middle">Возраст</th>
              <th className="text-center align-middle">Пол</th>
              <th className="text-center">Наличие Российского Гражданства</th>
              <th className="text-center">Наличие страховки</th>
              <th className="text-center align-middle">Зарплата</th>
              <th className="text-center">Время начала работы</th>
              <th className="text-center">Время окончания работы</th>
              <th className="text-center align-middle">Действия</th>
              <th className="text-center align-middle">Описание</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td className="text-center align-middle">{service.job}</td>
                <td className="text-center align-middle">{service.age}</td>
                <td className="text-cente align-middle">
                  {service.sex === 'A'
                    ? 'Не важно'
                    : service.sex === 'M'
                    ? 'Мужской'
                    : 'Женский'}
                </td>
                <td className="text-center align-middle">
                  {service.rus_passport ? 'Необходимо' : 'Нет необходимости'}
                </td>
                <td className="text-center align-middle">
                  {service.insurance ? 'Необходимо' : 'Нет необходимости'}
                </td>
                <td className="text-center align-middle">{service.salary}</td>
                <td className="text-center align-middle">
                  {returnRightStringDate(service.date_start)}
                </td>
                <td className="text-center align-middle">
                  {returnRightStringDate(service.date_end)}
                </td>

                <td className="text-center align-middle">
                  <Container className="p-3">
                    <Row>
                      <Button
                        size="sm"
                        className="btnFormBid mb-2 btn-success"
                        onClick={() => navigate(`/services/${service.id}/`)}
                      >
                        Карточка услуги
                      </Button>
                    </Row>
                    <Row>
                      <Button
                        size="sm"
                        className="btnDeleteBid btn-success mb-2"
                        onClick={() => {
                          btnDeleteHandler(service.id);
                        }}
                      >
                        Удалить
                      </Button>
                    </Row>
                    <Row>
                      <Button
                        size="sm"
                        className="btnDeleteBid btn-success"
                        onClick={() => {
                          btnChangeInfo(service.id);
                        }}
                      >
                        Изменить
                      </Button>
                    </Row>
                  </Container>
                </td>
                <td className="text-center">{service.about}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </LoadAnimation>
    </Container>
  );
};

export default ServiceTablePage;
