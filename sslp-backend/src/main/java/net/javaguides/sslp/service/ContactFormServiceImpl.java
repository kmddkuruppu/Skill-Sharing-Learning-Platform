package net.javaguides.sslp.service;

import net.javaguides.sslp.model.ContactForm;
import net.javaguides.sslp.repo.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactFormServiceImpl implements ContactFormService {

    @Autowired
    private ContactFormRepository contactFormRepository;

    @Override
    public ContactForm createContact(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }

    @Override
    public List<ContactForm> getAllContacts() {
        return contactFormRepository.findAll();
    }

    @Override
    public ContactForm getContactById(String id) {
        Optional<ContactForm> optional = contactFormRepository.findById(id);
        return optional.orElse(null);
    }
}
