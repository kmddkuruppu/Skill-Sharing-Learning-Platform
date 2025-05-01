package net.javaguides.sslp.controller;

import net.javaguides.sslp.model.SkillPost;
import net.javaguides.sslp.service.SkillPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class SkillPostController {

    private final SkillPostService postService;

    // Constructor injection of SkillPostService
    public SkillPostController(SkillPostService postService) {
        this.postService = postService;
    }

    // Endpoint to create a new post
    @PostMapping
    public ResponseEntity<SkillPost> createPost(@RequestBody SkillPost post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    // Endpoint to get all posts
    @GetMapping
    public ResponseEntity<List<SkillPost>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Endpoint to get a single post by its ID
    @GetMapping("/{id}")
    public ResponseEntity<SkillPost> getPostById(@PathVariable String id) {
        return ResponseEntity.ok(postService.getPostById(id).orElse(null));
    }

    // Endpoint to update a post by ID
    @PutMapping("/{id}")
    public ResponseEntity<SkillPost> updatePost(@PathVariable String id, @RequestBody SkillPost post) {
        return ResponseEntity.ok(postService.updatePost(id, post));
    }

    // Endpoint to delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
