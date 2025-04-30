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
        Learning created = learningService.createLearning(learning);
        String message = String.format("✅ Successfully added course '%s' with ID '%s'.", created.getCourseName(), created.getCourseId());
        return ResponseEntity.ok(message);
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
        Learning updated = learningService.updateLearning(id, updatedLearning);
        String message = String.format("✅ Successfully updated course '%s' with ID '%s'.", updated.getCourseName(), updated.getCourseId());
        return ResponseEntity.ok(message);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearning(@PathVariable String id) {
        Optional<Learning> learning = learningService.getLearningById(id);
        if (learning.isPresent()) {
            learningService.deleteLearning(id);
            String message = String.format("🗑️ Successfully deleted course '%s' with ID '%s'.", learning.get().getCourseName(), learning.get().getCourseId());
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.status(404).body("❌ Course not found for ID: " + id);
        }
    }
}
