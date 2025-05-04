package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "learnings")
public class Learning {

    @Id
    private String id;

    private String courseId;
    private String courseName;
    private double courseFee;
    private String description;
    private String duration;
    private String jobOpportunities;
    private List<CourseContent> courseContent;

    // Constructor
    public Learning() {}

    public Learning(String courseId, String courseName, double courseFee, String description,
                    String duration, String jobOpportunities, List<CourseContent> courseContent) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseFee = courseFee;
        this.description = description;
        this.duration = duration;
        this.jobOpportunities = jobOpportunities;
        this.courseContent = courseContent;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public List<CourseContent> getCourseContent() {
        return courseContent;
    }

    public void setCourseContent(List<CourseContent> courseContent) {
        this.courseContent = courseContent;
    }

    // Inner static class for course content
    public static class CourseContent {
        private String module;
        private List<String> topics;

        public CourseContent() {}

        public CourseContent(String module, List<String> topics) {
            this.module = module;
            this.topics = topics;
        }

        public String getModule() {
            return module;
        }

        public void setModule(String module) {
            this.module = module;
        }

        public List<String> getTopics() {
            return topics;
        }

        public void setTopics(List<String> topics) {
            this.topics = topics;
        }
    }
}
