package com.piyushgarg.service;

import java.util.List;

import com.piyushgarg.error.PlotAlreadyBookedException;
import com.piyushgarg.error.PlotNotFoundException;
import com.piyushgarg.model.Plot;
import com.piyushgarg.model.StatusEnum;
import com.piyushgarg.repository.PlotRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlotService {

    private PlotRepository plotRepository;

    public PlotService(PlotRepository plotRepository) {
        this.plotRepository = plotRepository;
    }

    public List<Plot> getPlots() {

        return plotRepository.findAll();
    }

    @Transactional
    public Plot updatePlot(Integer plotId) {

        Plot plot = plotRepository.findById(plotId).orElse(null);

        if (plot == null) {

            throw new PlotNotFoundException();

        } else if (plot.getStatus() == StatusEnum.BOOKED) {

            throw new PlotAlreadyBookedException();

        } else {

            plot.setStatus(StatusEnum.BOOKED);
            plotRepository.save(plot);
        }
        return plot;
    }
}
