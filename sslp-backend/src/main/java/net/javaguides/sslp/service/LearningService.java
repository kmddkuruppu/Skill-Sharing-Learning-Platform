package net.javaguides.sslp.service;

import net.javaguides.sslp.model.Learning;
import net.javaguides.sslp.repo.LearningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningService {

    @Autowired
    private LearningRepository learningRepository;

    // Create a new Learning
    public Learning createLearning(Learning learning) {
        return learningRepository.save(learning);
    }

    // Get all Learnings
    public List<Learning> getAllLearnings() {
        return learningRepository.findAll();
    }

    // Get a Learning by ID
    public Optional<Learning> getLearningById(String id) {
        return learningRepository.findById(id);
    }

    // Update a Learning
    public Learning updateLearning(String id, Learning updatedLearning) {
        return learningRepository.findById(id)
                .map(existingLearning -> {
                    existingLearning.setCourseId(updatedLearning.getCourseId());
                    existingLearning.setCourseName(updatedLearning.getCourseName());
                    existingLearning.setCourseFee(updatedLearning.getCourseFee());
                    existingLearning.setDescription(updatedLearning.getDescription());
                    existingLearning.setDuration(updatedLearning.getDuration());
                    existingLearning.setJobOpportunities(updatedLearning.getJobOpportunities());
                    return learningRepository.save(existingLearning);
                })
                .orElseGet(() -> {
                    updatedLearning.setId(id);
                    return learningRepository.save(updatedLearning);
                });
    }

    // Delete a Learning
    public void deleteLearning(String id) {
        learningRepository.deleteById(id);
    }
}
