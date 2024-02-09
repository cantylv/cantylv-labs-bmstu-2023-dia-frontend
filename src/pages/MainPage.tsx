import { FC } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import PhenomCard from "../card/card";
//import './space.css'
//import Breadcrumbs, { BreadcrumbLink } from '../breadcrumbs/bread';
//import { phenomens } from '../../mockData'

const MainPage: FC = () => {
    const [phenoms, setPhenoms] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetch(`/api/phenomens/`)
          .then((response) => response.json())
          .then((jsonData) => {setPhenoms(jsonData.phenomens)
            console.log(jsonData.data)
            console.log(phenoms)})
          .catch((error) => {
            console.log(phenomens)
            setPhenoms(phenomens)
            console.error('Error fetching data:', error)
            });
      }
    ,[]);

    const searchHandler = async () => {
         try {
            const response = await fetch(`/api/phenomens/?value=${searchValue}`);
            const jsonData = await response.json();
            setPhenoms(jsonData.phenomens);
          } catch (_) {
            const filteredPhenom = phenoms.filter((phenom) => phenom.phenom_name === searchValue);
            console.log(filteredPhenom)
            setPhenoms(filteredPhenom);
            console.log(phenoms)
          }
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Природные явления', url: '/phenomens/' },
    ];

    return(
        <div className="space">
            <form>
                <input value={searchValue} placeholder={"Введите название"} onChange={(event) => {setSearchValue(event.target.value)}}/>
                <button className="search-button" type="button" onClick={searchHandler}>Найти</button>
            </form>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className="cards container px-0">
                <div className="row row-cols-4">
                {phenoms.map((item) => (
                    <PhenomCard data={item}/>


                    
                ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage;