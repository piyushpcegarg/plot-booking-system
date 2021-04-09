import { Color } from '@material-ui/lab/Alert';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED'
}

export interface Notification {
  open: boolean;
  message?: string;
  severity?: Color;
}

interface Plot {
  id: string;
  status: StatusEnum;
  owner: string;
}

export default Plot;