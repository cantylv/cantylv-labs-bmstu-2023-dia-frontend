// Страница для просмотра/редактирования заявки
// Страница доступна только админу

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useIsAdmin, useIsAuth } from '../../store/slices/authSlice';
import { useDraftId } from '../../store/slices/draftSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, InputGroup, Form } from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';
import { Service, Bid, getBidDetailProps } from '../../interfaces';
import { bidInitialData } from '../../initialData';
import { getBid } from '../../internal/bids';

const BidPage = () => {
  const [bidServices, setBidServices] = useState<Service[]>([]); // состояние услуг рассматриваемой заявки
  const [bid, setBid] = useState<Bid>(bidInitialData); // состояние рассматриваемой зявки
  const [loaded, setLoaded] = useState(false);
  const [isDraft, setIsDraft] = useState(Boolean(useDraftId())); // если нет черновика, draftId === 0 - falsy значение
  const { bid_id } = useParams();

  const isAdmin = useIsAdmin();
  const isAuth = useIsAuth();
  const isUser = isAuth && !isAdmin;

  const navigate = useNavigate();

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

  const deleteServiceFromDraft = (service_id: number) => async () => {
    try {
      await axios.delete(
        `/api/v1/delete_service/${service_id}/bids/${bid_id}/`
      );
      setServices(services.filter((item) => item.id !== service_id));
    } catch (error) {
      console.log('Ошибка в получении заявки', error);
    }
  };

  const changeBidStatus = (new_status: string) => async () => {
    try {
      await axios.put(
        `/api/v1/bids/${bid_id}/new_status/?status=${new_status}`
      );
      if (new_status === 'deleted') {
        navigate('/');
      } else {
        setServices([]);
        getBid();
      }
    } catch (error) {
      console.log('Ошибка в изменении статуса заявки', error);
    }
  };

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Мои заявки', url: '/bids/' },
    { label: `Черновик` || '', url: `/bids/${bid_id}/` },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsLinks} />

      <div className="bid">
        <h5 className="title">Черновик</h5>
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
          <tbody>
            <tr>
              <td>{bid.status}</td>
              <td>
                {bid.date_create
                  ? new Date(bid.date_create).toISOString()
                  : '-'}
              </td>

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
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BidPage;
