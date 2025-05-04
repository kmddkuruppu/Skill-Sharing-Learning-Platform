package net.javaguides.sslp.service;

import net.javaguides.sslp.model.ContactForm;
import java.util.List;

public interface ContactFormService {
    ContactForm createContact(ContactForm contactForm);
    List<ContactForm> getAllContacts();
    ContactForm getContactById(String id);
}
