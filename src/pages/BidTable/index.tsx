// Страница с таблицой заявок  
// Страница доступна только авторизованному пользователю


import Breadcrumbs, {
  BreadcrumbLink,
} from '../../components/breadcrumb/index.tsx';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIsAdmin, useIsAuth } from '../../store/slices/authSlice.tsx';
import {
  setBidFilterData,
  useStatus,
  useDateStart,
  useDateEnd,
  useUsername,
} from '../../store/slices/bidFiltersSlice.tsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadAnimation from '../../components/LoadAnimation/index.tsx';

import { useNavigate } from 'react-router-dom';
import { Form, Button, Table, InputGroup } from 'react-bootstrap';
import { ru } from 'date-fns/locale';
import { Bid } from '../../interfaces.tsx';
import { getBidList, changeBidStatus, filterBids } from '../../internal/bids.tsx';
import {
  getBidListProps,
  changeBidStatusProps,
  filterBidsProps,
} from '../../interfaces.tsx';

const BidListPage = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [status, setStatus] = useState(useStatus());
  const [startDate, setStartDate] = useState(useDateStart());
  const [endDate, setEndDate] = useState(useDateEnd());
  const [username, setUsername] = useState(useUsername());
  const isAdmin = useIsAdmin();
  const isAuth = useIsAuth();
  const isUser = isAuth && !isAdmin;

  const [loaded, setLoaded] = useState<boolean>(false); // загрузка
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const props: getBidListProps = {
      setLoaded: setLoaded,
      setBids: setBids,
    };
    getBidList(props);
  }, []);

  const btnFilterBidsHandler = () => {
    const newBidFilterState = {
      status: status,
      startDate: startDate,
      endDate: endDate,
      username: username,
    };
    const props: filterBidsProps = {
      data: newBidFilterState,
      setLoaded: setLoaded,
      setBids: setBids,
    };
    filterBids(props);
    dispatch(setBidFilterData(newBidFilterState));
  };

  const breadcrumbsLinks: BreadcrumbLink[] = [
    { label: 'Заявки', url: '/bids/' },
  ];
  // добавить профиль пользоватля через navigate и никнейм

  return (
    <div className="bids">
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className="filterFormBidList">
        <div className="d-flex flex-row align-items-stretch flex-grow-1 gap-2">
          {isAdmin && (
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Никнейм</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </div>
          )}
          <InputGroup size="sm" className="shadow-sm">
            <InputGroup.Text>Статус заявки</InputGroup.Text>
            <Form.Select
              defaultValue={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option value="">Любая</option>
              <option value="formed">Сформирована</option>
              <option value="completed">Завершена</option>
              <option value="rejected">Отклонена</option>
              {isUser && <option value="draft">Черновик</option>}
            </Form.Select>
          </InputGroup>
          <div>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={(date: Date) =>
                setStartDate(date ? date.toISOString() : '')
              }
              isClearable
              locale={ru}
              maxDate={endDate ? new Date(endDate) : null}
              placeholderText="Начальная дата"
            />
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={(date: Date) =>
                setEndDate(date ? date.toISOString() : '')
              }
              minDate={new Date(startDate)}
              isClearable
              placeholderText="Дата окончания"
              locale={ru}
            />
          </div>
          <button onClick={btnFilterBidsHandler}>Применить фильтрацию</button>
        </div>
      </div>
      <LoadAnimation loaded={loaded}>
        <Table bordered hover>
          <thead>
            <tr>
              <th className="text-center">№</th>
              {isAdmin && <th className="text-center">Самозанятый</th>}
              <th className="text-center">Статус</th>
              <th className="text-center">Дата создания</th>
              <th className="text-center">Дата формирования</th>
              <th className="text-center">Дата завершения</th>
              {isAdmin && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid.id} className="table-row">
                <td
                  className="text-center"
                  onClick={() => navigate(`/bids/${bid.id}/`)}
                >
                  {index}
                </td>
                {isAdmin && (
                  <td className="text-center">{bid.user.username}</td>
                )}
                <td className="text-center">{bid.status}</td>
                <td className="text-center">{bid.date_create}</td>
                <td className="text-center">{bid.date_formation}</td>
                <td className="text-center">{bid.date_finish}</td>
                {isAdmin && (
                  <>
                    {bid.status === 'formed' && (
                      <td className="text-center align-middle p-0">
                        <Button
                          size="sm"
                          className="dark-button"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'completed',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                              setBids: setBids,
                            };
                            changeBidStatus(propsChangeStatus);
                          }}
                        >
                          Завершить
                        </Button>
                        <Button
                          size="sm"
                          className="danger-button"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'rejected',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                              setBids: setBids,
                            };
                            changeBidStatus(propsChangeStatus);
                          }}
                        >
                          Отклонить
                        </Button>
                      </td>
                    )}
                  </>
                )}

                {isUser && (
                  <>
                    {bid.status === 'draft' && (
                      <td className="text-center align-middle p-0">
                        <Button
                          size="sm"
                          className="dark-button"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'formed',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                              setBids: setBids,
                            };
                            changeBidStatus(propsChangeStatus);
                          }}
                        >
                          Cформировать
                        </Button>
                        <Button
                          size="sm"
                          className="danger-button"
                          onClick={() => {
                            const propsChangeStatus: changeBidStatusProps = {
                              data: {
                                status: 'deleted',
                                bidId: bid.id,
                              },
                              setLoaded: setLoaded,
                              setBids: setBids,
                            };
                            changeBidStatus(propsChangeStatus);
                          }}
                        >
                          Удалить
                        </Button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </LoadAnimation>
    </div>
  );
};

export default BidListPage;
