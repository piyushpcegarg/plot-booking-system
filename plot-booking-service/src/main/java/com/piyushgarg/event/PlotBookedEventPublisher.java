package com.piyushgarg.event;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import reactor.core.publisher.FluxSink;

@Component
public class PlotBookedEventPublisher implements ApplicationListener<PlotBookedEvent>,
    Consumer<FluxSink<PlotBookedEvent>>  {

    private final Executor executor;
    private final BlockingQueue<PlotBookedEvent> queue = new LinkedBlockingQueue<>();

    PlotBookedEventPublisher(Executor executor) {
        this.executor = Executors.newSingleThreadExecutor();;
    }

    @Override
    public void onApplicationEvent(PlotBookedEvent event) {
        this.queue.offer(event);
    }

    @Override
    public void accept(FluxSink<PlotBookedEvent> sink) {
        this.executor.execute(() -> {
            while (true)
                try {
                    PlotBookedEvent event = queue.take();
                    sink.next(event);
                }
                catch (InterruptedException e) {
                    ReflectionUtils.rethrowRuntimeException(e);
                }
        });
    }
}
