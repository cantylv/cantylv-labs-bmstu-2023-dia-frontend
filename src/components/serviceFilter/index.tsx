import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

// календарь
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { filterServicesProps, ServiceFilterMenuProps } from '../../interfaces';
import { filterServices } from '../../internal/services';
import { useDraftId } from '../../store/slices/draftSlice';

const ServiceFilterMenu: FC<ServiceFilterMenuProps> = (props) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [dateStart, setDateStart] = useState<Date | null>();
  const [dateEnd, setDateEnd] = useState<Date | null>();
  const [salaryStart, setSalaryStart] = useState<number>();
  const [salaryEnd, setSalaryEnd] = useState<number>();

  const draftId = useDraftId();

  const ButtonFilterHandler = () => {
    const filterProps: filterServicesProps = {
      data: {
        searchText: searchText,
        dateStart: dateStart?.toISOString(),
        dateEnd: dateEnd?.toISOString(),
        salaryStart: salaryStart,
        salaryEnd: salaryEnd,
        draftId: draftId,
      },
      setServices: props.setServices,
    };
    filterServices(filterProps, dispatch);
  };

  return (
    <div className="filterMenu">
      <InputGroup className="searchTextInput">
        <Form.Control
          type="text"
          placeholder="Название"
          name="search"
          onChange={(event) => setSearchText(event.target.value)}
        />

        <Button
          className="btn-search btn"
          type="button"
          onClick={ButtonFilterHandler}
        >
          Найти
        </Button>
      </InputGroup>

      <InputGroup className="searchTextInput">
        <InputGroup.Text className="textDateStart">
          Начало работы с
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
        <Button type="button" onClick={ButtonFilterHandler}>
          Найти
        </Button>
      </InputGroup>

      <InputGroup className="salaryInput">
        <InputGroup.Text className="textDateEnd">З/п от</InputGroup.Text>

        <Form.Control
          type="number"
          className="salary"
          onChange={(event) => setSalaryStart(Number(event.target.value))}
        />
        <InputGroup.Text className="textDateEnd">и до</InputGroup.Text>
        <Form.Control
          type="number"
          className="salary"
          onChange={(event) => setSalaryEnd(Number(event.target.value))}
        />
        <Button type="button" onClick={ButtonFilterHandler}>
          Найти
        </Button>
      </InputGroup>
    </div>
  );
};

export default ServiceFilterMenu;
