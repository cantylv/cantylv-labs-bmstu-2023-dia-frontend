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

// use.* - использовать значение состояния из Store
// change.* - изменить значение состояния
import {
  changeSearchText,
  changeSalaryStart,
  changeSalaryEnd,
  useSearchText,
  useSalaryStart,
  useSalaryEnd,
  useDateStart,
  useDateEnd,
  changeDateStart,
  changeDateEnd,
} from '../../store/slices/serviceFiltersSlice';

import { filterServicesProps, ServiceFilterMenuProps } from '../../interfaces';
import { filterServices } from '../../internal/services';
import { useDraftId } from '../../store/slices/draftSlice';

const ServiceFilterMenu: FC<ServiceFilterMenuProps> = (props) => {
  const dispatch = useDispatch();

  const searchText = useSearchText();
  const dateStart = useDateStart();
  const dateEnd = useDateEnd();
  const salaryStart = useSalaryStart();
  const salaryEnd = useSalaryEnd();

  const [dateStartState, setDateStartState] = useState<Date | null>(null);
  const [dateEndState, setDateEndState] = useState<Date | null>(null);

  const draftId = useDraftId();

  const ButtonFilterHandler = () => {
    const filterProps: filterServicesProps = {
      data: {
        searchText: searchText,
        dateStart: dateStart,
        dateEnd: dateEnd,
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
          onChange={(event) => dispatch(changeSearchText(event.target.value))}
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
          selected={dateStartState}
          onChange={(date) => {
            if (date) {
              setDateStartState(date);
              dispatch(changeDateStart(date.toISOString()));
            }
          }}
        />
        <InputGroup.Text className="textDateEnd">По</InputGroup.Text>
        <DatePicker
          locale="ru"
          className="datepicker"
          selected={dateEndState}
          onChange={(date) => {
            if (date) {
              setDateEndState(date);
              dispatch(changeDateEnd(date.toISOString()));
            }
          }} // нужно добавить проверку на falsy значение
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
          value="0"
          onChange={(event) =>
            dispatch(changeSalaryStart(Number(event.target.value)))
          }
        />
        <InputGroup.Text className="textDateEnd">и до</InputGroup.Text>
        <Form.Control
          type="number"
          className="salary"
          value="1000"
          onChange={(event) =>
            dispatch(changeSalaryEnd(Number(event.target.value)))
          }
        />
        <Button type="button" onClick={ButtonFilterHandler}>
          Найти
        </Button>
      </InputGroup>
    </div>
  );
};

export default ServiceFilterMenu;
