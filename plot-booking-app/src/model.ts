import { AlertColor } from '@mui/material/Alert';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED'
}

export interface Notification {
  open: boolean;
  message?: string;
  severity?: AlertColor;
}

interface Plot {
  id: number;
  status: StatusEnum;
  owner: string;
}

export default Plot;