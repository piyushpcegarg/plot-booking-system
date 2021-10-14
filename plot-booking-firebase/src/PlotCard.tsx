import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Plot, { StatusEnum, Notification } from './model';
import { CardContent, Typography } from '@mui/material';
import db from './Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

interface Props {
  plot: Plot;
  setNotification: (notification: Notification) => void;
}

const PlotCard = ({ plot, setNotification }: Props) => {
  const bookPlot = (id: string) => {
    const faker = require('faker');
    const plotsRef = collection(db, 'plots');
    const docRef = doc(plotsRef, id);

    setDoc(docRef, {
      status: StatusEnum.BOOKED,
      owner: faker.name.firstName(),
    })
      .then(() => {
        setNotification({
          open: true,
          message: 'Plot Booked successfully',
          severity: 'success',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Card>
      <CardHeader title={plot.id}></CardHeader>
      <CardContent>
        <Typography variant={'subtitle1'} color={'secondary'}>
          {plot.owner}
        </Typography>
      </CardContent>
      {plot.status === StatusEnum.BOOKED ? (
        <div>&nbsp;</div>
      ) : (
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => bookPlot(plot.id)}
          >
            Book
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default PlotCard;
