import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Plot, { StatusEnum, Notification } from './model';
import { CardContent, Typography } from '@material-ui/core';
import db from './Firebase';

interface Props {
  plot: Plot;
  setNotification: (notification: Notification) => void;
}

const PlotCard = ({
  plot,
  setNotification
}: Props ) => {

  const bookPlot = (id: string) => {

    const faker = require('faker');
    const docRef = db.collection('plots').doc(id);
    
    docRef.set({
      status: StatusEnum.BOOKED,
      owner: faker.name.firstName()
    })
    .then(() => {
      setNotification({
        open: true,
        message: 'Plot Booked successfully',
        severity: 'success'
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