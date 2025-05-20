package net.javaguides.sslp.repo;

import net.javaguides.sslp.model.SkillProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SkillProgressRepository extends MongoRepository<SkillProgress, String> {
    List<SkillProgress> findByUserId(String userId);
    List<SkillProgress> findByCourseId(String courseId);
}
