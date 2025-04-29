package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.Learning;
import net.javaguides.sslp.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createLearning(@RequestBody Learning learning) {
        Learning createdLearning = learningService.createLearning(learning);
        return ResponseEntity.ok("Learning course created successfully with ID: " + createdLearning.getId());
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
    public ResponseEntity<String> updateLearning(@PathVariable String id, @RequestBody Learning updatedLearning) {
        Learning learning = learningService.updateLearning(id, updatedLearning);
        return ResponseEntity.ok("Learning course updated successfully with ID: " + learning.getId());
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearning(@PathVariable String id) {
        learningService.deleteLearning(id);
        return ResponseEntity.ok("Learning course deleted successfully with ID: " + id);
    }
}
