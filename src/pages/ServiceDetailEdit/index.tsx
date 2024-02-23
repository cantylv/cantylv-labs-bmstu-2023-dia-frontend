// Страница для редактирования/создания услуги
// Страница доступна только админу
import { FC, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { Service, getOneServiceProps } from '../../interfaces';
import { serviceInitialData } from '../../initialData';
import { getOneService } from '../../internal/services';

// для красивого отображения страницы
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ServiceDetailEditPage: FC = () => {
  const [service, setService] = useState<Service>(serviceInitialData);
  // поля услуги
  const [job, setJob] = useState<string>('');
  const [img, setImg] = useState<string>(''); // для отображения услуги
  const [about, setAbout] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState<string>('A');
  const [rusPassport, setRusPassport] = useState<boolean>(false);
  const [insurance, setInsurance] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const [salary, setSalary] = useState<number>(0);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const { serviceId } = useParams();

  const putServiceData = async (data: FormData) => {
    const response: AxiosResponse = await axios.put(
      `/api/v1/services/${serviceId}/`,
      data
    );
    setImg(response.data.img);
  };

  useEffect(() => {
    const props: getOneServiceProps = {
      serviceId: Number(serviceId),
      setService: setService,
    };
    getOneService(props);

    setJob(service.job);
    setImg(service.img);
    setAbout(service.about);
    setAge(service.age);
    setSex(service.sex);
    setRusPassport(service.rus_passport);
    setInsurance(service.insurance);
    setStatus(service.status);
    setSalary(service.salary);
    setDateStart(new Date(service.date_start));
    setDateEnd(new Date(service.date_end));
  }, []);

  const btnApplyChangesHandler = () => {
    let updateServiceData = new FormData();
    updateServiceData.set('job', job);
    updateServiceData.set('about', about);
    updateServiceData.set('img', img);
    updateServiceData.set('age', age.toString());
    updateServiceData.set('sex', sex);
    updateServiceData.set('rus_passport', rusPassport.toString());
    updateServiceData.set('insurance', insurance.toString());
    updateServiceData.set('status', status.toString());
    updateServiceData.set('salary', salary.toString());
    if (dateStart && dateEnd) {
      updateServiceData.set('date_start', dateStart.toISOString());
      updateServiceData.set('date_end', dateEnd.toISOString());
    }

    putServiceData(updateServiceData);
  };

  return (
    <Container>
      <Row>
        <Image src={img} thumbnail />
      </Row>

      <Form>
        <Form.Group className="mb-3" controlId="serviceJobArea">
          <Form.Label>Название услуги</Form.Label>
          <Form.Control
            type="text"
            placeholder="Сантехнические работы"
            onChange={(event) => {
              setJob(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceAboutArea">
          <Form.Label>Об услуге</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(event) => {
              setAbout(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceAgeArea">
          <Form.Label>Возраст от:</Form.Label>
          <Form.Control
            type="text"
            placeholder="18"
            onChange={(event) => {
              setAge(Number(event.target.value));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceSexArea">
          <Form.Label>Пол</Form.Label>
          <Form.Select
            aria-label="sexServiceSelect"
            onChange={(event) => {
              setSex(event.target.value);
            }}
          >
            <option value="A">Не важно</option>
            <option value="M">Мужской</option>
            <option value="W">Женский</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="servicePassportArea">
          <Form.Label>Наличие Российского гражданства</Form.Label>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Обязательно"
              onChange={(event) => {
                setRusPassport(event.target.checked);
              }}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceInsuranceArea">
          <Form.Label>Наличие медицинской страховки</Form.Label>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Обязательно"
              onChange={(event) => {
                setRusPassport(event.target.checked);
              }}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceStatusArea">
          <Form.Label>Статус</Form.Label>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Активна"
              onChange={(event) => {
                setStatus(event.target.checked);
              }}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="serviceJobArea">
          <Form.Label>Зарплата</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>RUB</InputGroup.Text>
            <Form.Control
              placeholder="Сдельная стоимость услуги"
              onChange={(event) => {
                setSalary(Number(event.target.value));
              }}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Поменять изображение услуги</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => {
              setImg(event.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" onClick={btnApplyChangesHandler}>
          Сохранить изменения
        </Button>
      </Form>
    </Container>
  );
};

export default ServiceDetailEditPage;
