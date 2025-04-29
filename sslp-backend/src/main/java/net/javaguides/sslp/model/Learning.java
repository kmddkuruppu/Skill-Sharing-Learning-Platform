package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "learnings")
public class Learning {

    @Id
    private String id; // MongoDB ID (automatically generated)

    private String courseId;
    private String courseName;
    private double courseFee;
    private String description;
    private String duration;
    private String jobOpportunities;

    // Constructors
    public Learning() {
    }

    public Learning(String courseId, String courseName, double courseFee, String description, String duration, String jobOpportunities) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseFee = courseFee;
        this.description = description;
        this.duration = duration;
        this.jobOpportunities = jobOpportunities;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) { // <<<<<< Added this missing method
        this.id = id;
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

    public double getCourseFee() {
        return courseFee;
    }

    public void setCourseFee(double courseFee) {
        this.courseFee = courseFee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getJobOpportunities() {
        return jobOpportunities;
    }

    public void setJobOpportunities(String jobOpportunities) {
        this.jobOpportunities = jobOpportunities;
    }
}
