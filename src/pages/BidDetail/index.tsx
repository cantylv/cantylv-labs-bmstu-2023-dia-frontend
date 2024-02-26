// Страница для просмотра/редактирования заявки
// Страница доступна только админу

import { useEffect, useState } from 'react';
import { useIsAdmin, useIsAuth, useIsUser } from '../../store/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Table } from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';
import {
  Service,
  Bid,
  getBidDetailProps,
  deleteServiceFromDraftProps,
} from '../../interfaces';
import { bidInitialData } from '../../initialData';
import { changeBidStatusProps } from '../../interfaces';
import { getBid, changeBidStatus } from '../../internal/bids';
import LoadAnimation from '../../components/LoadAnimation';
import { deleteServiceFromDraft } from '../../internal/services';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const BidPage = () => {
  const dispatch = useDispatch();
  const [bidServices, setBidServices] = useState<Service[]>([]); // состояние услуг рассматриваемой заявки
  const [bid, setBid] = useState<Bid>(bidInitialData); // состояние рассматриваемой зявки
  const [bidStatus, setBidStatus] = useState('');

  const [loaded, setLoaded] = useState(false); // отвечает за спиннер загрузки

  const { bidId } = useParams();

  const isAdmin = useIsAdmin();
  const isAuth = useIsAuth();
  const isUser = useIsUser();

  const navigate = useNavigate();

  useEffect(() => {
    const props: getBidDetailProps = {
      data: {
        bidId: Number(bidId),
      },
      setLoaded: setLoaded,
      setBidServices: setBidServices,
      setBid: setBid,
      setBidStatus: setBidStatus,
    };
    getBid(props);
  }, []);

  const returnRussianBidStatus = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Черновик';
      case 'rejected':
        return 'Отклонена';
      case 'completed':
        return 'Принята';
      case 'formed':
        return 'Сформирована';
    }
  };

  const returnRightStringDate = (dateString: string | null) => {
    if (dateString) {
      const date = new Date(dateString);
      return moment(date).format('MM/DD/YYYY');
    } else {
      return '';
    }
  };

  const btnDeleteHandler = async (serviceId: number) => {
    const propsDelete: deleteServiceFromDraftProps = {
      serviceId: serviceId,
      draftId: Number(bidId),
    };
    deleteServiceFromDraft(propsDelete, dispatch).then(() => {
      const props: getBidDetailProps = {
        data: {
          bidId: Number(bidId),
        },
        setLoaded: setLoaded,
        setBidServices: setBidServices,
        setBid: setBid,
        setBidStatus: setBidStatus,
      };
      getBid(props);
    });
  };

  const btnServiceChangeStatusHadler = (status: string) => {
    const props: changeBidStatusProps = {
      data: {
        status: status,
        bidId: Number(bidId),
      },
      setLoaded: setLoaded,
    };
    changeBidStatus(props, dispatch).then(() => {
      const propStatus: getBidDetailProps = {
        data: {
          bidId: Number(bidId),
        },
        setLoaded: setLoaded,
        setBidServices: setBidServices,
        setBid: setBid,
        setBidStatus: setBidStatus,
      };
      getBid(propStatus);
    });
  };

  let breadcrumbsLinks: BreadcrumbLink[] = [];
  if (isUser) {
    breadcrumbsLinks = [
      { label: 'Мои заявки', url: '/bids/' },
      { label: `Заявка`, url: `/bids/${Number(bidId)}/` },
    ];
  }

  if (isAdmin) {
    breadcrumbsLinks = [
      { label: 'Список пользователських заявок', url: '/bids/' },
      { label: `Заявка  пользователя ${bid.user.username}`, url: `/bids/${Number(bidId)}/` },
    ];
  }
  return (
    <Container>
      <Breadcrumbs links={breadcrumbsLinks} />

      {bid.status === 'draft' ? (
        <h3 className="title mb-2">Черновик</h3>
      ) : (
        <h3 className="mb-2">Данные рассматриваемой заявки</h3>
      )}

      <div className="bid">
        <LoadAnimation loaded={loaded}>
          <Table bordered variant="primary" className="BidData">
            <thead>
              <tr>
                <th className="text-center">Статус</th>
                {isAdmin && <th className="text-center">Самозанятый</th>}
                <th className="text-center">Дата создания</th>
                <th className="text-center">Дата формирования</th>
                <th className="text-center">Дата завершения</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">
                  {returnRussianBidStatus(bidStatus)}
                </td>
                {isAdmin && (
                  <td className="text-center">{bid.user.username}</td>
                )}
                <td className="text-center">
                  {returnRightStringDate(bid.date_create)}
                </td>

                <td className="text-center">
                  {bid.date_formation
                    ? returnRightStringDate(
                        new Date(bid.date_formation).toISOString()
                      )
                    : '-'}
                </td>

                <td className="text-center">
                  {bid.date_finish
                    ? returnRightStringDate(
                        new Date(bid.date_finish).toISOString()
                      )
                    : '-'}
                </td>
              </tr>
            </tbody>
          </Table>
        </LoadAnimation>

        <div className="trashServiceHeader mt-5">
          <h3 className="mb-2">Список видов деятельностей</h3>
          {bidStatus === 'draft' && bidServices.length !== 0 && (
            <Button
              className="mb-2 btn-success"
              onClick={() => {
                btnServiceChangeStatusHadler('formed');
              }}
            >
              Сформировать
            </Button>
          )}
        </div>

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
                {bidStatus === 'draft' && (
                  <th className="text-center align-middle">Действия</th>
                )}
                <th className="text-center align-middle">Описание</th>
              </tr>
            </thead>

            <tbody>
              {isAuth &&
                bidServices.map((service, index) => (
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
                      {service.rus_passport
                        ? 'Необходимо'
                        : 'Нет необходимости'}
                    </td>
                    <td className="text-center align-middle">
                      {service.insurance ? 'Необходимо' : 'Нет необходимости'}
                    </td>
                    <td className="text-center align-middle">
                      {service.salary}
                    </td>
                    <td className="text-center align-middle">
                      {returnRightStringDate(service.date_start)}
                    </td>
                    <td className="text-center align-middle">
                      {returnRightStringDate(service.date_end)}
                    </td>
                    {bidStatus === 'draft' && (
                      <td className="text-center align-middle">
                        <Container className="p-3">
                          <Row>
                            <Button
                              size="sm"
                              className="btnFormBid mb-2 btn-success"
                              onClick={() =>
                                navigate(`/services/${service.id}/`)
                              }
                            >
                              Карточка услуги
                            </Button>
                          </Row>
                          <Row>
                            <Button
                              size="sm"
                              className="btnDeleteBid btn-success"
                              onClick={() => {
                                btnDeleteHandler(service.id);
                              }}
                            >
                              Удалить
                            </Button>
                          </Row>
                        </Container>
                      </td>
                    )}
                    <td className="text-center">{service.about}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </LoadAnimation>
      </div>
    </Container>
  );
};

export default BidPage;
