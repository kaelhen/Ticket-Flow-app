package com.ticketflow.core.controller;

import java.time.LocalDateTime;
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
@RequestMapping("/tickets")
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
        Long userId = request.userId;
        Long eventId = request.eventId;

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setEvent(event);
        ticket.setPurchaseDate(LocalDateTime.now());
        ticket.setStatus("Confirmado");
        return ticketRepository.save(ticket);
    }

    public static class TicketRequest {
        public Long userId;
        public Long eventId;
    }

}
