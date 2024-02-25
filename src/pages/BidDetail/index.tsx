// Страница для просмотра/редактирования заявки
// Страница доступна только админу

import { useEffect, useState } from 'react';
import { useIsAdmin, useIsAuth } from '../../store/slices/authSlice';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Table } from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';
import { Service, Bid, getBidDetailProps } from '../../interfaces';
import { bidInitialData } from '../../initialData';
import {
  changeBidStatusProps,
} from '../../interfaces';
import {
  getBid,
  changeBidStatus,
} from '../../internal/bids';
import LoadAnimation from '../../components/LoadAnimation';

const BidPage = () => {
  const [bidServices, setBidServices] = useState<Service[]>([]); // состояние услуг рассматриваемой заявки
  const [bid, setBid] = useState<Bid>(bidInitialData); // состояние рассматриваемой зявки
  const [loaded, setLoaded] = useState(false); // отвечает за спиннер загрузки
  const { bid_id } = useParams();

  const isAdmin = useIsAdmin();
  const isAuth = useIsAuth();
  const isUser = isAuth && !isAdmin;

  useEffect(() => {
    const props: getBidDetailProps = {
      data: {
        bidId: Number(bid_id),
      },
      setLoaded: setLoaded,
      setBidServices: setBidServices,
      setBid: setBid,
    };
    getBid(props);
  }, []);

  const btnDeleteHadler = (service_id: number) => {
    // const props: deleteServiceFromDraftProps = {
    //   data: {
    //     serviceId: service_id,
    //     draftId: Number(bid_id),
    //   },
    //   setBidServices: setBidServices,
    // };
    return service_id;
  };

  const btnServiceFormedHadler = () => {
    const props: changeBidStatusProps = {
      data: {
        status: 'formed',
        bidId: Number(bid_id),
      },
      setLoaded: setLoaded,
    };
    changeBidStatus(props);
    bid.status = props.data.status;
  };

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'История заявок', url: '/bids/' },
    { label: 'Заявка', url: '/bids/:bid_id/' },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsLinks} />

      <div className="bid">
        {bid.status === 'draft' && <h5 className="title">Черновик</h5>}
        <Table className="BidData">
          <thead>
            <tr>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата формирования</th>
              <th>Дата завершения</th>
              {isAdmin && <th>Создатель</th>}
            </tr>
          </thead>
          <LoadAnimation loaded={loaded}>
            <tbody>
              <tr>
                <td>{bid.status}</td>
                <td>{bid.date_create}</td>

                <td>
                  {bid.date_formation
                    ? new Date(bid.date_formation).toISOString()
                    : '-'}
                </td>

                <td>
                  {bid.date_finish
                    ? new Date(bid.date_finish).toISOString()
                    : '-'}
                </td>

                {isAdmin && (
                  <td>
                    <td>{bid.user.username}</td>
                  </td>
                )}
              </tr>
            </tbody>
          </LoadAnimation>
        </Table>

        <Table className="services">
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Возраст</th>
              <th>Пол</th>
              <th>Наличие Российского Гражданства</th>
              <th>Наличие страховки</th>
              <th>Зарплата</th>
              <th>Время начала работы</th>
              <th>Время окончания работы</th>
              <th>Действия</th>
            </tr>
          </thead>
          <LoadAnimation loaded={loaded}>
            <tbody>
              {isUser &&
                bid.status === 'draft' &&
                bidServices.map((service, index) => (
                  <tr key={index}>
                    <td>{service.job}</td>
                    <td>{service.about}</td>
                    <td>{service.age}</td>
                    <td>{service.sex}</td>
                    <td>{service.rus_passport}</td>
                    <td>{service.insurance}</td>
                    <td>{service.salary}</td>
                    <td>{service.date_start}</td>
                    <td>{service.date_end}</td>
                    <td>
                      <Container>
                        <Row>
                          <Button
                            className="btnFormBid"
                            onClick={() => {
                              btnServiceFormedHadler();
                            }}
                          >
                            Сформировать
                          </Button>
                        </Row>
                        <Row>
                          <Button
                            className="btnDeleteBid"
                            onClick={() => {
                              btnDeleteHadler(service.id);
                            }}
                          >
                            Удалить
                          </Button>
                        </Row>
                      </Container>
                    </td>
                  </tr>
                ))}
            </tbody>
          </LoadAnimation>
        </Table>
      </div>
    </>
  );
};

export default BidPage;
