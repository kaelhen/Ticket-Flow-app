package com.ticketflow.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketflow.core.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
