import { FC } from 'react';
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
import { useIsAdmin, useIsUser } from '../../store/slices/authSlice';

const BidFilterMenu: FC<BidFilterMenuProps> = (props) => {
  const [username, setUsername] = useState('');
  const [dateStart, setDateStart] = useState<Date | null>();
  const [dateEnd, setDateEnd] = useState<Date | null>();
  const [bidStatus, setBidStatus] = useState('');

  const isUser = useIsUser();
  const isAdmin = useIsAdmin();

  const btnFilterBidsHandler = () => {
    const filterProps: filterBidsProps = {
      data: {
        status: bidStatus,
        dateStart: dateStart?.toISOString(),
        dateEnd: dateEnd?.toISOString(),
        username: username,
      },
      setLoaded: props.setLoaded,
      setBids: props.setBids,
    };
    filterBids(filterProps);
  };

  return (
    <div className={`${isUser ? 'disFlexFilter' : 'bidfilterMenu'}`}>
      {isAdmin && (
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
      )}

      <InputGroup className={`${isUser ? 'dateInputUser' : 'dateInput'}`}>
        <InputGroup.Text className="textDateStart">
          Дата формирования с
        </InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateStart}
          onChange={(date) => {
            setDateStart(date);
          }}
        />
        <InputGroup.Text className="textDateEnd">По</InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateEnd}
          onChange={(date) => {
            setDateEnd(date);
          }}
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
          <option value="completed">Принята</option>
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
