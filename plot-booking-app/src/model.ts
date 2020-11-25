export enum StatusEnum {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED"
}

interface Plot {
  id: number;
  status: String;
  owner: string;
}

export default Plot;