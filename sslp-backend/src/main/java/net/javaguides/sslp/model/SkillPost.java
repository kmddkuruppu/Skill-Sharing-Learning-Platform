package net.javaguides.sslp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "skill_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillPost {
    @Id
    private String id;

    private List<String> mediaUrls;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Long userId;
    private String username;
    private List<String> likedUserIds;
    private List<Comment> comments;
}
