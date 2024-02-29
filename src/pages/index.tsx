import { FC } from "react";
import { useState, useEffect } from "react";
import ServiceCard from "../components/card/element";
import Breadcrumbs, { BreadcrumbLink } from '../components/breadcrumb/element';
import { Service, mock_services_short_info } from '../mockData';
import { Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ru from 'date-fns/locale/ru';

registerLocale('ru', ru)


const ListServices: FC = () => {

    const [services, setServices] = useState<Service[]>([])
    const [searchText, setSearchText] = useState('')
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [salaryStart, setSalaryStart] = useState<number | null>(null)
    const [salaryEnd, setSalaryEnd] = useState<number | null>(null)

    useEffect(() => {
        fetch(`/api/v1/services/`)
            .then((response) => {
                return response.json()
            })
            .then((jsonData) => {
                setServices(jsonData)
                console.log(jsonData)
            })
            .catch((error) => {
                setServices(mock_services_short_info)
                console.error('Ошибка при запросе списка услуг:', error)
            });
    }, []);

    const ButtonHandler = () => {
        let url = '/api/v1/services/?';
        let params = new URLSearchParams();
    
        // Добавляем параметр поиска, если текст поиска не пустой
        if (searchText.trim() !== '') {
            params.append('search', searchText.trim());
        }

        // Добавляем параметры даты, если они установлены
        if (startDate) {
            params.append('date_start', startDate.toISOString());
        }
        if (endDate) {
            params.append('date_end', endDate.toISOString());
        }
        if (salaryStart) {
            params.append('date_end', salaryStart.toString());
        }
        if (salaryEnd) {
            params.append('date_end', salaryEnd.toString());
        }
    
        // Добавляем параметры к URL
        url += params.toString();
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((jsonData) => {
                setServices(jsonData);
            })
            .catch((error) => {
                let filteredServices = mock_services_short_info
                if (searchText) {
                    console.log(searchText)
                    filteredServices = filteredServices.filter((service) => service.job.toLowerCase() === searchText.toLowerCase());  
                } 
                if (startDate) {
                    filteredServices = filteredServices.filter((service) => new Date(service.date_start) >= new Date(startDate));
                    
                }
                if (endDate) {
                    filteredServices = filteredServices.filter((service) => new Date(service.date_start) <= new Date(endDate)); 
                }
                if (salaryStart) {
                    filteredServices = filteredServices.filter((service) => service.salary >= salaryStart); 
                }
                if (salaryEnd) {
                    filteredServices = filteredServices.filter((service) => service.salary <= salaryEnd); 
                }
                setServices(filteredServices)
                console.error('Ошибка при запросе отфильтрованного списка услуг:', error)
            })
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Список услуг', url: '/' }
    ];

    return (
        <div className="container">
            <h1 className="main_header">Каталог услуг</h1>
            <div className="prompt_text">
                Более 200 видов деятельности и более тысячи заказчиков — предлагай свои услуги и согласовывай их с
                модератором. Выбирай комфортные условия и работай спокойно вместе с сервисом для внештатного персонала ПодJOBка!
            </div>
            <div className="filterMenu">
                <form id="filterForm">
                    <input id="filter_input" value={searchText} name="search" type="text" placeholder="Поиск..." onChange={(event) => { setSearchText(event.target.value) }} />
                    <Button className="btn-search btn" type="button" onClick={ButtonHandler}>Найти</Button>
                </form>
                <div className="filterTime">
                    <span className="textDateStart">Начало работы с</span>
                    <DatePicker locale="ru" className="datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                    <span className="textDateEnd">По</span>
                    <DatePicker locale="ru" className="datepicker" selected={endDate} onChange={(date) => setEndDate(date)} />
                    <Button type="button" onClick={ButtonHandler}>Найти</Button>
                </div>
                <div className="filterSalary">
                <span className="textDateStart">З/п от</span>
                    <input className="salaryBlock" onChange={(event) => { setSalaryStart(parseInt(event.target.value))}}/>
                    <span className="textDateEnd">и до</span>
                    <input  className="salaryBlock" onChange={(event) => { setSalaryEnd(parseInt(event.target.value))}} />
                    <Button type="button" onClick={ButtonHandler}>Найти</Button>
                </div>
            </div>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className="services">
                {services.map((item) => (
                    <ServiceCard data={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default ListServices;