import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

// календарь
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

// use.* - использовать значение состояния из Store
// change.* - изменить значение состояния
import {
  useSearchText,
  useDateStart,
  useDateEnd,
  useSalaryStart,
  useSalaryEnd,
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

  const [searchText, setSearchText] = useState(useSearchText());
  const [dateStart, setDateStart] = useState(new Date(useDateStart()));
  const [dateEnd, setDateEnd] = useState(new Date(useDateEnd()));
  const [salaryStart, setSalaryStart] = useState(useSalaryStart());
  const [salaryEnd, setSalaryEnd] = useState(useSalaryEnd());

  const ButtonFilterhHandler = () => {
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
      <form id="filterForm">
        <input
          id="filter_input"
          value={searchText}
          name="search"
          type="text"
          placeholder="Поиск..."
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Button
          className="btn-search btn"
          type="button"
          onClick={ButtonFilterhHandler}
        >
          Найти
        </Button>
      </form>
      <div className="filterTime">
        <span className="textDateStart">Начало работы с</span>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateStart}
          onChange={(date) => date && setDateStart(date)}
        />
        <span className="textDateEnd">По</span>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={new Date(dateEnd)}
          onChange={(date) => date && setDateEnd(date)} // нужно добавить проверку на falsy значение
        />
        <Button type="button" onClick={ButtonFilterhHandler}>
          Найти
        </Button>
      </div>
      <div className="filterSalary">
        <span className="textDateStart">З/п от</span>
        <input
          className="salaryBlock"
          type="number"
          value={salaryStart}
          onChange={(event) => setSalaryStart(Number(event.target.value))}
        />
        <span className="textDateEnd">и до</span>
        <input
          className="salaryBlock"
          type="number"
          value={salaryStart}
          onChange={(event) => setSalaryEnd(Number(event.target.value))}
        />
        <Button type="button" onClick={ButtonFilterhHandler}>
          Найти
        </Button>
      </div>
    </div>
  );
};

export default ServiceFilterMenu;
