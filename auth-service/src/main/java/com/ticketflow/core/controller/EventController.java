package com.ticketflow.core.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.ticketflow.core.model.Event;
import com.ticketflow.core.repository.EventRepository;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @org.springframework.web.bind.annotation.PutMapping("/{id}")
    public Event updateEvent(@org.springframework.web.bind.annotation.PathVariable Long id,
            @org.springframework.web.bind.annotation.RequestBody Event eventDetails) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        event.setName(eventDetails.getName());
        event.setDescripcion(eventDetails.getDescripcion());
        event.setLocation(eventDetails.getLocation());
        event.setPrice(eventDetails.getPrice());
        event.setDate(eventDetails.getDate());
        return eventRepository.save(event);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/{id}")
    public void deleteEvent(@org.springframework.web.bind.annotation.PathVariable Long id) {
        eventRepository.deleteById(id);
    }

}
