package com.piyushgarg.repository;

import java.util.Optional;

import javax.persistence.LockModeType;

import com.piyushgarg.model.Plot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

public interface PlotRepository extends JpaRepository<Plot, Integer> {

    @Lock(LockModeType.PESSIMISTIC_READ)
    Optional<Plot> findById(Integer id);
}
