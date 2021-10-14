import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Plot, { StatusEnum, Notification } from './model';
import { CardContent, Typography } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';

interface Props {
  plot: Plot;
  setNotification: (notification: Notification) => void;
}

const PlotCard = ({
  plot,
  setNotification
}: Props ) => {

  const bookPlot = (id: number) => {

    fetch('http://localhost:8080/plots/' + id, {
        method: 'PUT',
      })
      .then(response => response.json())
      .then(data => {
        let message = 'Plot Booked successfully';
        let severity: AlertColor = 'success';
        if (data.error) {
          message = data.message;
          severity = 'error';
        }
        setNotification({
          open: true,
          message: message,
          severity: severity
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Card>
      <CardHeader title={plot.id}></CardHeader>
      <CardContent>
        <Typography variant={'subtitle1'} color={'secondary'}>
            {plot.owner}
        </Typography>
      </CardContent>
      {
        plot.status === StatusEnum.BOOKED ?
          <div>&nbsp;</div>
          :
          <CardActions>
            <Button size='small' color='primary' variant='outlined' onClick={() => bookPlot(plot.id)}>Book</Button>
          </CardActions>
      }
    </Card>
  );
}

export default PlotCard;