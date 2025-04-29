package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.Learning;
import net.javaguides.sslp.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/learnings")
@CrossOrigin(origins = "*")
public class LearningController {

    @Autowired
    private LearningService learningService;

    // Create
    @PostMapping
    public Learning createLearning(@RequestBody Learning learning) {
        return learningService.createLearning(learning);
    }

    // Read all
    @GetMapping
    public List<Learning> getAllLearnings() {
        return learningService.getAllLearnings();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Optional<Learning> getLearningById(@PathVariable String id) {
        return learningService.getLearningById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Learning updateLearning(@PathVariable String id, @RequestBody Learning updatedLearning) {
        return learningService.updateLearning(id, updatedLearning);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteLearning(@PathVariable String id) {
        learningService.deleteLearning(id);
    }
}
