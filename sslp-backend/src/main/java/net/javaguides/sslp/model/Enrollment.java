package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enrollments")
public class Enrollment {

    @Id
    private String id;

    private String fullName;
    private String emailAddress;
    private String nicNumber;
    private String phoneNumber;
    private String courseId;
    private String courseName;
    private String learningMode;

    // Constructors
    public Enrollment() {
    }

    public Enrollment(String fullName, String emailAddress, String nicNumber, String phoneNumber,
                      String courseId, String courseName, String learningMode) {
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.nicNumber = nicNumber;
        this.phoneNumber = phoneNumber;
        this.courseId = courseId;
        this.courseName = courseName;
        this.learningMode = learningMode;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getLearningMode() {
        return learningMode;
    }

    public void setLearningMode(String learningMode) {
        this.learningMode = learningMode;
    }

    // Optional: toString method
    @Override
    public String toString() {
        return "Enrollment{" +
                "id='" + id + '\'' +
                ", fullName='" + fullName + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", nicNumber='" + nicNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", courseId='" + courseId + '\'' +
                ", courseName='" + courseName + '\'' +
                ", learningMode='" + learningMode + '\'' +
                '}';
    }
}
