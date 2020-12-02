package com.piyushgarg.event;

import com.piyushgarg.model.Plot;

import org.springframework.context.ApplicationEvent;

public class PlotBookedEvent extends ApplicationEvent {

    private static final long serialVersionUID = 1L;

    public PlotBookedEvent(Plot plot) {
        super(plot);
    }
}
