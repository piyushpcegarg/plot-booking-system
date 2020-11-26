import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Plot, { StatusEnum, Notification } from './model';
import { CardContent, Typography } from '@material-ui/core';
import { Color } from '@material-ui/lab/Alert';

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
        let severity: Color = 'success';
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