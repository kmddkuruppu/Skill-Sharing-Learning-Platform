package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.Enrollment;
import net.javaguides.sslp.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService service;

    @PostMapping
    public Enrollment createEnrollment(@RequestBody Enrollment enrollment) {
        return service.createEnrollment(enrollment);
    }

    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable String id, @RequestBody Enrollment enrollment) {
        return service.updateEnrollment(id, enrollment);
    }

    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable String id) {
        service.deleteEnrollment(id);
    }

    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(@PathVariable String id) {
        return service.getEnrollmentById(id);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return service.getAllEnrollments();
    }
}
