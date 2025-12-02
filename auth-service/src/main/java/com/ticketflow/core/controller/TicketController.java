package com.ticketflow.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketflow.core.model.Event;
import com.ticketflow.core.model.Ticket;
import com.ticketflow.core.model.User;
import com.ticketflow.core.repository.EventRepository;
import com.ticketflow.core.repository.TicketRepository;
import com.ticketflow.core.repository.UserRepository;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @PostMapping
    public Ticket buyTicket(@RequestBody TicketRequest request) {
        User user = userRepository.findById(request.userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Event event = eventRepository.findById(request.eventId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Ticket newTicket = new Ticket(user, event);
        return ticketRepository.save(newTicket);
    }

    public static class TicketRequest {
        public Long userId;
        public Long eventId;
    }

}
