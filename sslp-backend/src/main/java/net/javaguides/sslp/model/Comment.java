package net.javaguides.sslp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

import java.time.LocalDateTime;

@Document(collection = "comments")  // MongoDB collection annotation
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    private Long id;

    private String content;
    private String commenter;
    private LocalDateTime timestamp;
}
