package net.javaguides.sslp.repo;

import net.javaguides.sslp.model.Learning;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningRepository extends MongoRepository<Learning, String> {
}
