package com.piyushgarg.controller;

import java.util.List;

import com.piyushgarg.model.Plot;
import com.piyushgarg.service.PlotService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/plots")
public class PlotController {

    private PlotService plotService;

    public PlotController(PlotService plotService) {
        this.plotService = plotService;
    }

    @GetMapping
    public List<Plot> getPlots() {

        return plotService.getPlots();
    }

    @PutMapping(path = "/{plotId}")
    public Plot bookPlot(@PathVariable("plotId") Integer plotId) {

        return plotService.updatePlot(plotId);
    }
    
}
