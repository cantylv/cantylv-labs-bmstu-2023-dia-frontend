import image1 from './assets/service1.png'
import image2 from './assets/service2.jpg'
import image3 from './assets/service3.jpg'
import image4 from './assets/service4.jpg'
import image5 from './assets/service5.jpg'

interface Service {
    id: number;
    job: string;
    img: string;
    about: string;
    age: number;
    sex: string;
    rus_passport: boolean;
    insurance: boolean;
    status: boolean;
    salary: number;
    date_start: string;
    date_end: string;
}

export const phenomens: Service[] = [
    {
        id: 1, job: "Программист", img: image1, about: "Нужно уметь классно кодить, делать умный вид",
        age: 19, sex: "A", rus_passport: false, insurance: false, status: true, salary: 300,
        date_start: "2024-02-05 15:17:46.000000 +00:00", date_end: "2024-02-21 15:17:51.000000 +00:00"
    },
    {
        id: 2, job: "Телескопист", img: image2, about: "Познать все страсти науки",
        age: 14, sex: "A", rus_passport: false, insurance: false, status: true, salary: 2500,
        date_start: "2024-02-07 12:18:50.946000 +00:00", date_end: "2024-02-07 12:18:50.946000 +00:00"
    },
    {
        id: 3, job: "Ученый-биолог", img: image3, about: "Познать все страсти науки",
        age: 14, sex: "A", rus_passport: false, insurance: false, status: true, salary: 2500,
        date_start: "2024-02-07 12:18:50.946000 +00:00", date_end: "2024-02-10 12:18:50.946000 +00:00"
    },
    {
        id: 4, job: "Тренер", img: image4, about: "Накачать пресс",
        age: 14, sex: "A", rus_passport: false, insurance: false, status: true, salary: 2500,
        date_start: "2024-02-07 12:18:50.946000 +00:00", date_end: "2024-02-10 12:18:50.946000 +00:00"
    },
    {
        id: 5, job: "Преподаватель", img: image5, about: "Объяснить тригонометрические уравнения, первый замечательный предел",
        age: 14, sex: "A", rus_passport: false, insurance: false, status: true, salary: 2500,
        date_start: "2024-02-07 12:18:50.946000 +00:00", date_end: "2024-02-07 12:18:50.946000 +00:00"
    }
];