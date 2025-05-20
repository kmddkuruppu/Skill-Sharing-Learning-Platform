package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document(collection = "skill_progress")
public class SkillProgress {

    @Id
    private String id;

    private String userId;
    private String courseId;
    private List<String> completedModules;
    private int totalModules;
    private double progressPercentage;
    private boolean isCertificateEligible;
    private List<String> badgesEarned;
    private String feedback; // Personalized feedback from system/instructor

    // === Constructors ===

    public SkillProgress() {
    }

    public SkillProgress(String id, String userId, String courseId, List<String> completedModules,
                         int totalModules, double progressPercentage, boolean isCertificateEligible,
                         List<String> badgesEarned, String feedback) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.completedModules = completedModules;
        this.totalModules = totalModules;
        this.progressPercentage = progressPercentage;
        this.isCertificateEligible = isCertificateEligible;
        this.badgesEarned = badgesEarned;
        this.feedback = feedback;
    }

    // === Getters and Setters ===

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public List<String> getCompletedModules() {
        return completedModules;
    }

    public void setCompletedModules(List<String> completedModules) {
        this.completedModules = completedModules;
    }

    public int getTotalModules() {
        return totalModules;
    }

    public void setTotalModules(int totalModules) {
        this.totalModules = totalModules;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public boolean isCertificateEligible() {
        return isCertificateEligible;
    }

    public void setCertificateEligible(boolean certificateEligible) {
        isCertificateEligible = certificateEligible;
    }

    public List<String> getBadgesEarned() {
        return badgesEarned;
    }

    public void setBadgesEarned(List<String> badgesEarned) {
        this.badgesEarned = badgesEarned;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    // === Optional: toString(), equals(), and hashCode() ===

    @Override
    public String toString() {
        return "SkillProgress{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", courseId='" + courseId + '\'' +
                ", completedModules=" + completedModules +
                ", totalModules=" + totalModules +
                ", progressPercentage=" + progressPercentage +
                ", isCertificateEligible=" + isCertificateEligible +
                ", badgesEarned=" + badgesEarned +
                ", feedback='" + feedback + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SkillProgress)) return false;
        SkillProgress that = (SkillProgress) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
