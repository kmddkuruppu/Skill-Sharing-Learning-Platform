package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Document(collection = "skills")
public class Skill {

    @Id
    private String id;

    private String name;
    private String emailAddress;
    private String skillTitle;
    private String skillDescription;
    private String experienceLevel;
    private String howYouUseIt;
    private List<String> tags; // Category or tags
    private boolean availabilityForCollaboration;
    private LocalDate date;
    private LocalTime time;

    // Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getSkillTitle() {
        return skillTitle;
    }

    public void setSkillTitle(String skillTitle) {
        this.skillTitle = skillTitle;
    }

    public String getSkillDescription() {
        return skillDescription;
    }

    public void setSkillDescription(String skillDescription) {
        this.skillDescription = skillDescription;
    }

    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public String getHowYouUseIt() {
        return howYouUseIt;
    }

    public void setHowYouUseIt(String howYouUseIt) {
        this.howYouUseIt = howYouUseIt;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public boolean isAvailabilityForCollaboration() {
        return availabilityForCollaboration;
    }

    public void setAvailabilityForCollaboration(boolean availabilityForCollaboration) {
        this.availabilityForCollaboration = availabilityForCollaboration;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
