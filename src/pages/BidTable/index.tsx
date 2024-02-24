// Страница с таблицой заявок
// Страница доступна только авторизованному пользователю

import Breadcrumbs, {
  BreadcrumbLink,
} from '../../components/breadcrumb/index.tsx';

import { useState, useEffect } from 'react';
import { useIsAdmin, useIsAuth } from '../../store/slices/authSlice.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import LoadAnimation from '../../components/LoadAnimation/index.tsx';

import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { Bid } from '../../interfaces.tsx';
import { getBidList, changeBidStatus } from '../../internal/bids.tsx';
import { getBidListProps, changeBidStatusProps } from '../../interfaces.tsx';
import Container from 'react-bootstrap/Container';
import BidFilterMenu from '../../components/bidFilter/index.tsx';

const BidListPage = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const isAdmin = useIsAdmin();
  const isAuth = useIsAuth();
  const isUser = isAuth && !isAdmin;

  const [loaded, setLoaded] = useState<boolean>(false); // загрузка
  const navigate = useNavigate();

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
      return date
        .toISOString()
        .replace('T', ' ')
        .replace('Z', '')
        .substring(0, 16);
    } else {
      return '';
    }
  };

  useEffect(() => {
    const props: getBidListProps = {
      setLoaded: setLoaded,
      setBids: setBids,
    };
    getBidList(props);
  }, []);

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Cписок пользовательских заявок', url: '/bids/' },
  ];
  // добавить профиль пользоватля через navigate и никнейм

  return (
    <Container className="bids">
      <Breadcrumbs links={breadcrumbsLinks} />

      <BidFilterMenu setLoaded={setLoaded} setBids={setBids} />

      <LoadAnimation loaded={loaded}>
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th className="text-center">№</th>
              <th className="text-center">Статус</th>
              {isAdmin && <th className="text-center">Самозанятый</th>}
              <th className="text-center">Дата создания</th>
              <th className="text-center">Дата формирования</th>
              <th className="text-center">Дата завершения</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid.id} className="table-row">
                <td
                  className="text-center"
                  onClick={() => navigate(`/bids/${bid.id}/`)}
                >
                  {++index}
                </td>
                <td className="text-center">
                  {returnRussianBidStatus(bid.status)}
                </td>
                {isAdmin && (
                  <td className="text-center">{bid.user.username}</td>
                )}
                <td className="text-center">
                  {returnRightStringDate(bid.date_create)}
                </td>
                <td className="text-center">
                  {returnRightStringDate(bid.date_formation)}
                </td>
                <td className="text-center">{returnRightStringDate(bid.date_finish)}</td>
                {isAdmin && (
                  <>
                    {bid.status === 'formed' ? (
                      <td className="btnBids p-0 mt-2">
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'completed',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                            };
                            changeBidStatus(propsChangeStatus);
                            bids[index].status = propsChangeStatus.data.status;
                          }}
                        >
                          Завершить
                        </Button>
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'rejected',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                            };
                            changeBidStatus(propsChangeStatus);
                            bids[index].status = propsChangeStatus.data.status;
                          }}
                        >
                          Отклонить
                        </Button>
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            navigate(`/bids/${bid.id}`);
                          }}
                        >
                          Подробнее
                        </Button>
                      </td>
                    ) : (
                      <td className="btnBids p-0 mt-2">
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            navigate(`/bids/${bid.id}`);
                          }}
                        >
                          Подробнее
                        </Button>
                      </td>
                    )}
                  </>
                )}

                {isUser && (
                  <div>
                    {bid.status === 'draft' ? (
                      <td className="btnBids p-0">
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'formed',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                            };
                            changeBidStatus(propsChangeStatus);
                            bids[index].status = propsChangeStatus.data.status;
                          }}
                        >
                          Cформировать
                        </Button>
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'deleted',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                            };
                            changeBidStatus(propsChangeStatus);
                            bids[index].status = propsChangeStatus.data.status;
                          }}
                        >
                          Удалить
                        </Button>
                        <td>
                          <Button
                            size="sm"
                            className="btn-success"
                            onClick={() => {
                              navigate(`/bids/${bid.id}`);
                            }}
                          >
                            Подробнее
                          </Button>
                        </td>
                      </td>
                    ) : (
                      <td className="btnBids p-0 mt-2">
                        <Button
                          size="sm"
                          className="btn-success"
                          onClick={() => {
                            navigate(`/bids/${bid.id}`);
                          }}
                        >
                          Подробнее
                        </Button>
                      </td>
                    )}
                  </div>
                )}
              </tr>
            ))}
            {!bids.length && (
              <tr>
                <td colSpan={7} className="emptyTableLabel">
                  Пользовательских заявок нет
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </LoadAnimation>
    </Container>
  );
};

export default BidListPage;
