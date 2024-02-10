import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

import moment from 'moment' // для преобразования DateTimeField в формат day hh:mm

export interface ServiceShortInfoProps {
    data: {
        id: number;
        job: string;
        img?: string;  // здесь будет храниться URL фотки в S3-хранилище 
        age: number;
        salary: number;
        date_start: string;
        date_end: string;
    };
}



const ServiceCard: FC<ServiceShortInfoProps> = (props) => {
    const navigate = useNavigate();

    const handleButtonInfoClick = () => {
        navigate(`/labs-bmstu-2023-dia-frontend/services/${props.data.id}/`);
    }

    const handleButtonDeleteClick = () => {
        // нужно добавить удаление услуги  
        navigate(`/labs-bmstu-2023-dia-frontend/services/${props.data.id}/`);
    }

    return (
        <div className="card-service">
            <div className="card-service-img">
                {
                    <img alt="employee" className="card-service-img-employee" src={props.data.img} />
                }
            </div>

            <div className="card-service-small-data">
                <div className="card-service-about-title">{props.data.job}</div>

                <div className="card-service-short-info-age card-title">Необходимый возраст:</div>
                <div className="card-service-short-info-age-ans card-title-ans">{props.data.age}+</div>

                <div className="card-service-short-info-salary card-title">Зарплата</div>
                <div className="card-service-short-info-salary-ans card-title-ans">{props.data.salary} RUB</div>

                <div className="card-service-short-info-time-start card-title">Начало работы</div>
                <div className="card-service-short-info-time-start-ans card-title-ans">{moment(props.data.date_start).format('DD.MM.YYYY в hh:mm')}</div>

                <div className="card-service-short-info-time-end card-title">Конец работы</div>
                <div className="card-service-short-info-time-end-ans card-title-ans">{moment(props.data.date_end).format('DD.MM.YYYY в hh:mm')}</div>
            </div>

            <div className="btns">
                <Button className="card-service-btn-info btn" onClick={handleButtonInfoClick}>Подробнее</Button>
                <Button className="card-service-btn-delete btn" onClick={handleButtonDeleteClick}>Удалить</Button>
            </div>
        </div>
    )
}

export default ServiceCard;
