package net.javaguides.sslp.service;

import net.javaguides.sslp.model.Enrollment;

import java.util.List;

public interface EnrollmentService {
    Enrollment createEnrollment(Enrollment enrollment);
    Enrollment updateEnrollment(String id, Enrollment enrollment);
    void deleteEnrollment(String id);
    Enrollment getEnrollmentById(String id);
    List<Enrollment> getAllEnrollments();
}
