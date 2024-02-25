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
}

export interface getBidsProps {
  data: {
    getParameters: string;
  };
  setBids: (services: Bid[]) => void;
}

export interface deleteServiceFromDraftProps {
  serviceId: number;
  draftId: number;
}

export interface addServiceToDraftProps {
  serviceId: number;
}

export interface ServiceCardProps {
  data: Service;
}

export interface filterServicesProps {
  data: {
    searchText: string | undefined;
    dateStart: string | undefined;
    dateEnd: string | undefined;
    salaryStart: number | undefined;
    salaryEnd: number | undefined;
    draftId: number | undefined;
  };
  setServices: (services: Service[]) => void;
}

export interface ServiceFilterMenuProps {
  setServices: (services: Service[]) => void;
}

export interface BidFilterMenuProps {
  setBids: (bids: Bid[]) => void;
  setLoaded: (is_loading: boolean) => void;
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
  };
  setLoaded: (is_loading: boolean) => void;
}

export interface getBidDetailProps {
  data: {
    bidId: number;
  };
  setLoaded: (is_loading: boolean) => void;
  setBidServices: (services: Service[]) => void;
  setBid: (bids: Bid) => void;
}

export interface filterBidsProps {
  data: {
    status: string;
    dateStart: string;
    dateEnd: string;
    username: string;
  };
  setLoaded: (is_loading: boolean) => void;
  setBids: (bids: Bid[]) => void;
}

export interface initialStateDraft {
  draftId: number;
  services: Service[];
  servicesId: number[];
}

export interface initialStateServiceFilter {
  searchText: string;
  dateStart: string;
  dateEnd: string;
  salaryStart: number;
  salaryEnd: number;
}

export interface initialStateBidFilter {
  status: string;
  dateStart: string;
  dateEnd: string;
  username: string;
}

export interface initialStateAuth {
  isAuth: boolean;
  isUser: boolean;
  isAdmin: boolean;
  username: string;
}
