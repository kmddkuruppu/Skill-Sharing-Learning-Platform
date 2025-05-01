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

    public SkillPostController(SkillPostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<SkillPost> createPost(@RequestBody SkillPost post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    @GetMapping
    public ResponseEntity<List<SkillPost>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillPost> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillPost> updatePost(@PathVariable Long id, @RequestBody SkillPost post) {
        return ResponseEntity.ok(postService.updatePost(id, post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
