// Страница для редактирования/создания услуги
// Страница доступна только админу
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Service, getOneServiceProps } from '../../interfaces';
import { serviceInitialData } from '../../initialData';
import { getOneService } from '../../internal/services';

const ServiceDetailEditPage: FC = () => {
  const [service, setService] = useState<Service>(serviceInitialData);
  // поля услуги 
  
  const { serviceId } = useParams();
  useEffect(() => {
    const props: getOneServiceProps = {
      serviceId: Number(serviceId),
      setService: setService,
    };
    getOneService;
  }, []);

  return <></>;
};

export default ServiceDetailEditPage;
