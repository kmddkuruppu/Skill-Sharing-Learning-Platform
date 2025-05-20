package net.javaguides.sslp.repo;

import net.javaguides.sslp.model.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillRepository extends MongoRepository<Skill, String> {
    // You can add custom queries if needed
}
