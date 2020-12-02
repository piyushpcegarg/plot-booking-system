package com.piyushgarg.service;

import java.util.List;

import com.github.javafaker.Faker;
import com.piyushgarg.error.PlotAlreadyBookedException;
import com.piyushgarg.error.PlotNotFoundException;
import com.piyushgarg.event.PlotBookedEvent;
import com.piyushgarg.model.Plot;
import com.piyushgarg.model.StatusEnum;
import com.piyushgarg.repository.PlotRepository;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlotService {

    private final ApplicationEventPublisher publisher;
    private PlotRepository plotRepository;
    private Faker faker;

    public PlotService(ApplicationEventPublisher publisher, PlotRepository plotRepository) {
        this.publisher = publisher;
        this.plotRepository = plotRepository;
        this.faker = new Faker();
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
            plot.setOwner(faker.name().firstName());
            plotRepository.save(plot);
        }
        publisher.publishEvent(new PlotBookedEvent(plot));
        return plot;
    }
}
