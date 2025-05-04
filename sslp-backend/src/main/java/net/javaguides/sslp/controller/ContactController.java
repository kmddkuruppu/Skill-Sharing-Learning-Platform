package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.ContactForm;
import net.javaguides.sslp.service.ContactFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactFormService contactFormService;

    @PostMapping
    public ContactForm createContact(@RequestBody ContactForm contactForm) {
        return contactFormService.createContact(contactForm);
    }

    @GetMapping
    public List<ContactForm> getAllContacts() {
        return contactFormService.getAllContacts();
    }

    @GetMapping("/{id}")
    public ContactForm getContactById(@PathVariable String id) {
        return contactFormService.getContactById(id);
    }
}
