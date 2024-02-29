// Страница для редактирования/создания услуги
// Страница доступна только админу
import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getOneServiceAdminProps,
  deleteServiceAdminProps,
  ServiceDataChange,
} from '../../interfaces';
import {
  deleteServiceAdmin,
  getOneServiceAdmin,
} from '../../internal/services';

import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumb';

// календарь
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

// для красивого отображения страницы
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import LoadAnimation from '../../components/LoadAnimation';

const ServiceDetailEditPage: FC = () => {
  // поля услуги
  const [job, setJob] = useState<string>('');
  const [img, setImg] = useState<string>(''); // для отображения услуги
  const [about, setAbout] = useState<string>('');
  const [age, setAge] = useState<number>(14);
  const [sex, setSex] = useState<string>('A');
  const [rusPassport, setRusPassport] = useState<boolean>(false);
  const [insurance, setInsurance] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);
  const [salary, setSalary] = useState<number>(0);
  const [dateStart, setDateStart] = useState<Date | null>();
  const [dateEnd, setDateEnd] = useState<Date | null>();

  const [file, setFile] = useState<File | null>();

  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);

  const putServiceData = async (data: ServiceDataChange) => {
    await axios
      .put(`/api/v1/services/${serviceId}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((service) => {
        if (service) {
          setJob(service.data.job);
          setImg(service.data.img);
          setAbout(service.data.about);
          setAge(service.data.age);
          setSex(service.data.sex);
          setRusPassport(service.data.rus_passport);
          setInsurance(service.data.insurance);
          setStatus(service.data.status);
          setSalary(service.data.salary);
          setDateStart(new Date(service.data.date_start));
          setDateEnd(new Date(service.data.date_end));
        }
      });
  };

  const addNewService = async (data: ServiceDataChange) => {
    await axios
      .post(`/api/v1/services/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((service) => {
        if (service) {
          setJob(service.data.job);
          setImg(service.data.img);
          setAbout(service.data.about);
          setAge(service.data.age);
          setSex(service.data.sex);
          setRusPassport(service.data.rus_passport);
          setInsurance(service.data.insurance);
          setStatus(service.data.status);
          setSalary(service.data.salary);
          setDateStart(new Date(service.data.date_start));
          setDateEnd(new Date(service.data.date_end));
          navigate(`/services/${service.data.id}/edit/`);
        }
      });
  };

  useEffect(() => {
    if (serviceId) {
      const props: getOneServiceAdminProps = {
        serviceId: Number(serviceId),
        setLoaded: setLoaded,
      };
      getOneServiceAdmin(props).then((service) => {
        if (service) {
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
        }
      });
    } else {
      setImg('http://localhost:9000/services/default.jpg');
    }
  }, []);

  const btnApplyChangesHandler = async () => {
    let updateServiceData: ServiceDataChange = {
      job: job,
      about: about,
      age: age,
      sex: sex,
      rus_passport: rusPassport,
      insurance: insurance,
      status: status,
      salary: salary,
    };
    if (file) {
      updateServiceData['img'] = file;
    }
    if (dateStart) {
      updateServiceData['date_start'] = dateStart.toISOString();
    }
    if (dateEnd) {
      updateServiceData['date_end'] = dateEnd.toISOString();
    }
    if (serviceId) {
      putServiceData(updateServiceData);
    } else {
      addNewService(updateServiceData);
    }
  };

  const btnDeleteHandler = async (serviceId: number) => {
    const propsDelete: deleteServiceAdminProps = {
      serviceId: serviceId,
    };
    deleteServiceAdmin(propsDelete).then(() => {
      navigate('/services/edit/');
    });
  };

  let breadcrumbsLinks: BreadcrumbLink[] = [];
  if (serviceId) {
    breadcrumbsLinks = [
      {
        label: 'Редактирование видов деятельности',
        url: `/services/${Number(serviceId)}/edit/`,
      },
      { label: job || '', url: `/services/${serviceId}/` },
    ];
  } else {
    breadcrumbsLinks = [
      { label: 'Создание нового вида деятельности', url: '/services/new/' },
    ];
  }

  return (
    <Container>
      <Breadcrumbs links={breadcrumbsLinks} />
      <LoadAnimation loaded={loaded}>
        <Container>
          <Row className="row-service-img">
            <Image src={img} className="service-img" thumbnail />
          </Row>

          <Form>
            <Form.Group className="mb-3" controlId="serviceJobArea">
              <Form.Label>Название услуги</Form.Label>
              <span className="dangerText">* Обязательно</span>
              <Form.Control
                type="text"
                placeholder="Сантехнические работы"
                value={job}
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
                value={about}
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
                value={age}
                onChange={(event) => {
                  setAge(Number(event.target.value));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceSexArea">
              <Form.Label>Пол</Form.Label>
              <Form.Select
                aria-label="sexServiceSelect"
                value={sex}
                onChange={(event) => {
                  setSex(event.target.value);
                }}
              >
                <option value="A">Не важно</option>
                <option value="M">Мужской</option>
                <option value="F">Женский</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="servicePassportArea">
              <Form.Label>Наличие Российского гражданства</Form.Label>
              <div className="mb-3">
                <Form.Check
                  checked={rusPassport}
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
                  checked={insurance}
                  type="checkbox"
                  label="Обязательно"
                  onChange={(event) => {
                    setInsurance(event.target.checked);
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceStatusArea">
              <Form.Label>Статус</Form.Label>
              <div className="mb-3">
                <Form.Check
                  checked={status}
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
              <span className="dangerText">* Обязательно</span>
              <InputGroup className="mb-3">
                <InputGroup.Text>RUB</InputGroup.Text>
                <Form.Control
                  value={salary}
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
                  const files = (event.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    const selectedFile = files[0];
                    setFile(selectedFile);
                  }
                }}
              />
            </Form.Group>

            <label className='timeWorkLabel'>Время работы</label>    
            <span className="dangerText">* Обязательно</span>
            <InputGroup className="searchTextInput dateTimeForm">
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
            </InputGroup>

            <Button
              variant="primary"
              className="me-3"
              onClick={btnApplyChangesHandler}
            >
              Сохранить изменения
            </Button>
            {serviceId && (
              <Button
                variant="primary"
                onClick={() => {
                  btnDeleteHandler(Number(serviceId));
                }}
              >
                Удалить услугу
              </Button>
            )}
          </Form>
        </Container>
      </LoadAnimation>
    </Container>
  );
};

export default ServiceDetailEditPage;
