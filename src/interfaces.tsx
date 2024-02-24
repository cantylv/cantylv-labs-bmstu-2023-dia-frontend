export interface Service {
  id: number;
  job: string;
  img: string; // нужно посмотреть, что будет, если я отправлю на бек пустое поле с картинкой
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

export interface User {
  id: number;
  username: string;
  first_name?: string | null;
  second_name?: string | null;
  email?: string | null;
  phone?: string | null;
  password: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  last_login: string;
  date_joined: string;
}

export interface Bid {
  id: number;
  user: User;
  moderator: User | null;
  date_create: string;
  date_formation: string | null;
  date_finish: string | null;
  status: string;
  services: Service[] | null;
}

export interface getServicesProps {
  data: {
    getParameters: string;
  };
  setServices: (services: Service[]) => void;
  setDraftId: (draftId: number) => void;
  setDraftServices: (services: Service[]) => void;
}

export interface deleteServiceFromDraftProps {
  data: {
    serviceId: number;
  };
  setBidServices: (services: Service[]) => void;
}

export interface addServiceToDraftProps {
  data: {
    serviceId: number;
  };
  setDraftServices: (services: Service[]) => void;
  setDraftId: (draftId: number) => void;
}

export interface ServiceCardProps {
  data: Service;
  setDraftServices: (services: Service[]) => void;
  setDraftId: (draftId: number) => void;
}

export interface filterServicesProps {
  data: {
    searchText: string;
    dateStart: string;
    dateEnd: string;
    salaryStart: number;
    salaryEnd: number;
  };
  setServices: (services: Service[]) => void;
  setDraftId: (draftId: number) => void;
  setDraftServices: (services: Service[]) => void;
}

export interface ServiceFilterMenuProps {
  setServices: (services: Service[]) => void;
  setDraftId: (draftId: number) => void;
  setDraftServices: (services: Service[]) => void;
}

export interface getOneServiceProps {
  serviceId: number;
  setService: (services: Service) => void;
}

export interface SignUpProps {
  username: string;
  firstName?: string;
  secondName?: string;
  email?: string;
  password: string;
  phone?: string;
  setUsername: (username: string) => void;
  setFirstName: (firstName: string) => void;
  setSecondName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPhone: (phone: string) => void;
  submitHandler: (event: any) => void;
}

export interface getBidListProps {
  setLoaded: (is_loading: boolean) => void;
  setBids: (bids: Bid[]) => void;
}

export interface changeBidStatusProps {
  data: {
    status: string;
    bidId: number;
  }
  setLoaded: (is_loading: boolean) => void;
}

export interface getBidDetailProps {
  data: {
    bidId: number;
  }
  setLoaded: (is_loading: boolean) => void;
  setBidServices: (services: Service[]) => void;
  setBid: (bids: Bid) => void;
}

export interface filterBidsProps {
  data: {
    status: string;
    startDate: string;
    endDate: string;
    username: string;
  };
  setLoaded: (is_loading: boolean) => void;
  setBids: (bids: Bid[]) => void;
}
