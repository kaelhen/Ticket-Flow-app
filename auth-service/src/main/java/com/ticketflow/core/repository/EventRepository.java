package com.ticketflow.core.repository;

import com.ticketflow.core.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    // Aquí podríamos agregar búsquedas personalizadas en el futuro
    // Ejemplo: List<Event> findByLocation(String location);
}
