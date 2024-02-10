import { FC } from "react";
import { useState, useEffect } from "react";
import ServiceCard from "../components/card/element";
import Breadcrumbs, { BreadcrumbLink } from '../components/breadcrumb/element';
import { Service, mock_services_short_info } from '../mockData';
import { Button } from "react-bootstrap";

const ListServices: FC = () => {

    const [services, setServices] = useState<Service[]>([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        fetch(`/api/v1/services/`)
            .then((response) => {
                return response.json()
            })
            .then((jsonData) => {
                setServices(jsonData)
            })
            .catch((error) => {
                setServices(mock_services_short_info)
                console.error('Ошибка при запросе списка услуг:', error)
            });
    }, []);

    const searchButtonHandler = () => {
        console.log('we are here')
        fetch(`/api/v1/services/?search=${searchText}`)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((jsonData) => {
                console.log(jsonData)
                setServices(jsonData);
            })
            .catch((error) => {
                const filteredServices = mock_services_short_info.filter((service) => service.job.toLowerCase() === searchText.toLowerCase());
                setServices(filteredServices);
                console.error('Ошибка при запросе отфильтрованного списка услуг:', error)
            })
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Список услуг', url: '/labs-bmstu-2023-dia-frontend/' }
    ];

    return (
        <div className="container">
            <h1 className="main_header">Каталог услуг</h1>
            <div className="prompt_text">
                Более 200 видов деятельности и более тысячи заказчиков — предлагай свои услуги и согласовывай их с
                модератором. Выбирай комфортные условия и работай спокойно вместе с сервисом для внештатного персонала ПодJOBка!
            </div>
            <form id="filterForm">
                <input id="filter_input" value={searchText} name="search" type="text" placeholder="Поиск..." onChange={(event) => { setSearchText(event.target.value) }} />
                <Button className="btn-search btn" type="button" onClick={searchButtonHandler}>Найти</Button>
            </form>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className="services">
                {services.map((item) => (
                    <ServiceCard data={item} key={item.id}/>
                ))}
            </div>
        </div>
    )
}

export default ListServices;