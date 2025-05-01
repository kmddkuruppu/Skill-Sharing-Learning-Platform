package net.javaguides.sslp.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<String> mediaUrls;

    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Long userId;
    private String username;

    @ElementCollection
    private List<String> likedUserIds;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "post_id")
    private List<Comment> comments;
}
