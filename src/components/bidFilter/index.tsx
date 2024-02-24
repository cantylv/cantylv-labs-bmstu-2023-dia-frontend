import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

// календарь
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { filterBidsProps, BidFilterMenuProps } from '../../interfaces';
import { filterBids } from '../../internal/bids';
import { setBidFilterData } from '../../store/slices/bidFiltersSlice';

const BidFilterMenu: FC<BidFilterMenuProps> = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [bidStatus, setBidStatus] = useState('');
  const isAdmin = localStorage.getItem('isAdmin');
  const isAuth = localStorage.getItem('isAuth');
  const isUser = isAuth && !isAdmin;

  const btnFilterBidsHandler = () => {
    const newBidFilterState = {
      status: bidStatus,
      dateStart: dateStart.toISOString(),
      dateEnd: dateEnd.toISOString(),
      username: username,
    };
    const filterProps: filterBidsProps = {
      data: newBidFilterState,
      setLoaded: props.setLoaded,
      setBids: props.setBids,
    };
    filterBids(filterProps);
    dispatch(setBidFilterData(newBidFilterState));
  };

  return (
    <div className="bidfilterMenu">
      <InputGroup className="usernameInput">
        <Form.Control
          type="text"
          placeholder="Никнейм"
          value={username}
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />

        <Button
          className="btn-search btn"
          type="button"
          onClick={btnFilterBidsHandler}
        >
          Найти
        </Button>
      </InputGroup>

      <InputGroup className="dateInput">
        <InputGroup.Text className="textDateStart">
          Дата формирования с
        </InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateStart}
          onChange={(date) => date && setDateStart(date)}
        />
        <InputGroup.Text className="textDateEnd">По</InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateEnd}
          onChange={(date) => date && setDateEnd(date)} // нужно добавить проверку на falsy значение
        />
        <Button type="button" onClick={btnFilterBidsHandler}>
          Найти
        </Button>
      </InputGroup>

      <InputGroup className="statusInput">
        <InputGroup.Text>Статус заявки</InputGroup.Text>
        <Form.Select
          defaultValue={status}
          onChange={(event) => {
            setBidStatus(event.target.value);
          }}
        >
          <option value="">Не указано</option>
          <option value="formed">Сформирована</option>
          <option value="completed">Завершена</option>
          <option value="rejected">Отклонена</option>
          {isUser && <option value="draft">Черновик</option>}
        </Form.Select>
        <Button type="button" onClick={btnFilterBidsHandler}>
          Применить
        </Button>
      </InputGroup>
    </div>
  );
};

export default BidFilterMenu;
