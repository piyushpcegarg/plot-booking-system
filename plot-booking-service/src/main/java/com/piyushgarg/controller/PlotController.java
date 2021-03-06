package com.piyushgarg.controller;

import java.util.List;

import com.piyushgarg.error.ErrorCodes;
import com.piyushgarg.error.PlotAlreadyBookedException;
import com.piyushgarg.error.PlotNotFoundException;
import com.piyushgarg.event.PlotBookedEvent;
import com.piyushgarg.event.PlotBookedEventPublisher;
import com.piyushgarg.model.Plot;
import com.piyushgarg.service.PlotService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping(path = "/plots")
public class PlotController {

    private final PlotService plotService;
    private final Flux<PlotBookedEvent> events;

    public PlotController(PlotBookedEventPublisher eventPublisher, PlotService plotService) {
        this.events = Flux.create(eventPublisher).share();
        this.plotService = plotService;
    }

    @GetMapping
    public List<Plot> getPlots() {

        return plotService.getPlots();
    }

    @GetMapping(path = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Plot>> getPlotEvents() {
        return this.events.map(pbe -> {
            return plotService.getPlots();
        });
    }

    @PutMapping(path = "/{plotId}")
    public Plot bookPlot(@PathVariable("plotId") Integer plotId) {

        try {
            return plotService.updatePlot(plotId);    

        } catch (PlotNotFoundException e) {
            
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ErrorCodes.PLOT_NOT_FOUND, e);

        } catch (PlotAlreadyBookedException e) {

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCodes.PLOT_ALREADY_BOOKED, e);
        }
    }
}
