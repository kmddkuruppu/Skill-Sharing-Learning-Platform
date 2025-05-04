package net.javaguides.sslp.repo;

import net.javaguides.sslp.model.ContactForm;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactFormRepository extends MongoRepository<ContactForm, String> {
}
