package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.SkillProgress;
import net.javaguides.sslp.service.SkillProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class SkillProgressController {

    @Autowired
    private SkillProgressService service;

    @PostMapping
    public SkillProgress createProgress(@RequestBody SkillProgress progress) {
        return service.createProgress(progress);
    }

    @GetMapping("/{id}")
    public SkillProgress getProgressById(@PathVariable String id) {
        return service.getProgressById(id);
    }

    @GetMapping
    public List<SkillProgress> getAllProgress() {
        return service.getAllProgress();
    }

    @GetMapping("/user/{userId}")
    public List<SkillProgress> getProgressByUser(@PathVariable String userId) {
        return service.getProgressByUser(userId);
    }

    @PutMapping("/{id}")
    public SkillProgress updateProgress(@PathVariable String id, @RequestBody SkillProgress progress) {
        return service.updateProgress(id, progress);
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable String id) {
        service.deleteProgress(id);
    }
}
