package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.Learning;
import net.javaguides.sslp.repo.LearningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/learnings")
@CrossOrigin(origins = "*") // Allow requests from frontend (React, etc.)
public class LearningController {

    @Autowired
    private LearningRepository learningRepository;

    // Create
    @PostMapping
    public Learning createLearning(@RequestBody Learning learning) {
        return learningRepository.save(learning);
    }

    // Read all
    @GetMapping
    public List<Learning> getAllLearnings() {
        return learningRepository.findAll();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Optional<Learning> getLearningById(@PathVariable String id) {
        return learningRepository.findById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Learning updateLearning(@PathVariable String id, @RequestBody Learning updatedLearning) {
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
                    updatedLearning.setId(id); // This line now works because setId() exists
                    return learningRepository.save(updatedLearning);
                });
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteLearning(@PathVariable String id) {
        learningRepository.deleteById(id);
    }
}
