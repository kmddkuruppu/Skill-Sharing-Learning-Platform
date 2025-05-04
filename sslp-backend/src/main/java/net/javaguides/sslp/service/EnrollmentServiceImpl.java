package net.javaguides.sslp.service;

import net.javaguides.sslp.model.Enrollment;
import net.javaguides.sslp.repo.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository repository;

    @Override
    public Enrollment createEnrollment(Enrollment enrollment) {
        return repository.save(enrollment);
    }

    @Override
    public Enrollment updateEnrollment(String id, Enrollment enrollment) {
        Optional<Enrollment> existing = repository.findById(id);
        if (existing.isPresent()) {
            Enrollment e = existing.get();
            e.setFullName(enrollment.getFullName());
            e.setEmailAddress(enrollment.getEmailAddress());
            e.setNicNumber(enrollment.getNicNumber());
            e.setPhoneNumber(enrollment.getPhoneNumber());
            e.setCourseId(enrollment.getCourseId());
            e.setCourseName(enrollment.getCourseName());
            e.setLearningMode(enrollment.getLearningMode());
            return repository.save(e);
        }
        return null;
    }

    @Override
    public void deleteEnrollment(String id) {
        repository.deleteById(id);
    }

    @Override
    public Enrollment getEnrollmentById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Enrollment> getAllEnrollments() {
        return repository.findAll();
    }
}
