package net.javaguides.sslp.service;

import net.javaguides.sslp.model.Learning;
import java.util.List;
import java.util.Optional;

public interface LearningService {
    Learning createLearning(Learning learning);
    List<Learning> getAllLearnings();
    Optional<Learning> getLearningById(String id);
    Learning updateLearning(String id, Learning updatedLearning);
    void deleteLearning(String id);
}
