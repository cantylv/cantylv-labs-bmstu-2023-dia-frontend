import React, { FC } from 'react';
import {Link} from 'react-router-dom'

export interface BreadcrumbLink {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

// нужно будте добавить переадресацию при нажатии на крошку. мы же не просто так добавили url в интерфейс
const Breadcrumbs: FC<BreadcrumbsProps> = ({links}) => {
  return (
    <div className='breadcrumbs'>
      <div className='breadcrumbs-location'><b>Вы сейчас здесь:</b></div>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Link className='breadCrumbLabel' to={link.url}>{link.label}</Link>
          {index < links.length - 1 && <span className="separator">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;