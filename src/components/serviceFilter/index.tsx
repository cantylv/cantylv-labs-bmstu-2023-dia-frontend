import { FC, useEffect } from 'react';
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

// use.* - использовать значение состояния из Store
// change.* - изменить значение состояния
import {
  changeSearchText,
  changeDateStart,
  changeDateEnd,
  changeSalaryStart,
  changeSalaryEnd,
} from '../../store/slices/serviceFiltersSlice';

import { filterServicesProps, ServiceFilterMenuProps } from '../../interfaces';
import { filterServices } from '../../internal/services';

const ServiceFilterMenu: FC<ServiceFilterMenuProps> = (props) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [salaryStart, setSalaryStart] = useState<number>(0);
  const [salaryEnd, setSalaryEnd] = useState<number>(1000);

  const ButtonFilterHandler = () => {
    const filterProps: filterServicesProps = {
      data: {
        searchText: searchText,
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
        salaryStart: salaryStart,
        salaryEnd: salaryEnd,
      },
      setServices: props.setServices,
      setDraftId: props.setDraftId,
      setDraftServices: props.setDraftServices,
    };
    filterServices(filterProps);
  };

  useEffect(() => {
    dispatch(changeSearchText(searchText));
  }, [searchText]);

  useEffect(() => {
    dispatch(changeDateStart(dateStart.toISOString()));
  }, [dateStart]);

  useEffect(() => {
    dispatch(changeDateEnd(dateEnd.toISOString()));
  }, [dateEnd]);

  useEffect(() => {
    dispatch(changeSalaryStart(salaryStart));
  }, [salaryStart]);

  useEffect(() => {
    dispatch(changeSalaryEnd(salaryEnd));
  }, [salaryEnd]);

  return (
    <div className="filterMenu">
      <InputGroup className="searchTextInput">
        <Form.Control
          type="text"
          placeholder="Название"
          value={searchText}
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
          onChange={(date) => date && setDateStart(date)}
        />
        <InputGroup.Text className="textDateEnd">По</InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={new Date(dateEnd)}
          onChange={(date) => date && setDateEnd(date)} // нужно добавить проверку на falsy значение
        />
        <Button type="button" onClick={ButtonFilterHandler}>
          Найти
        </Button>
      </InputGroup>

      <InputGroup className="salaryInput">
        <InputGroup.Text className="textDateEnd">З/п от</InputGroup.Text>

        <Form.Control
          type="number"
          value={salaryStart}
          className='salary'
          onChange={(event) => setSalaryStart(Number(event.target.value))}
        />
        <InputGroup.Text className="textDateEnd">и до</InputGroup.Text>
        <Form.Control
          type="number"
          value={salaryEnd}
          className='salary'
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
