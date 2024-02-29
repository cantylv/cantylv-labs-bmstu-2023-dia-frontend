import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HelloPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="helloPageContainer">
      <div className="textHelloPage">
        <h1 className="titleHelloPage">
          Место, в котором каждый найдет себе работу
        </h1>
        <p>Мы рады видеть вас на нашем сайте.</p>
        <p>
          С нами вы сможете найти высокооплачиваемую работу, ценящего
          сотрудников работадателя, много различных интересных проектов.
        </p>
      </div>
      <div className="btnsHelloPage">
        <Button
          onClick={() => {
            navigate('/labs-bmstu-2023-dia-frontend/services/');
          }}
        >
          Виды деятельности
        </Button>
        <Button
          onClick={() => {
            navigate('/labs-bmstu-2023-dia-frontend/#list_bid');
          }}
        >
          Ваши заявки
        </Button>
      </div>
    </div>
  );
};

export default HelloPage;
