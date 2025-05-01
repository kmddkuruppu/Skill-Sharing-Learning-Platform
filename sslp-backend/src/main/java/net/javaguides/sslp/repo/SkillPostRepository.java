package net.javaguides.sslp.repo;

import net.javaguides.sslp.model.SkillPost;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillPostRepository extends MongoRepository<SkillPost, String> {
}
