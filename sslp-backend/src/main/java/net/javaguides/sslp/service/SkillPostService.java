package net.javaguides.sslp.service;

import net.javaguides.sslp.model.SkillPost;
import net.javaguides.sslp.repo.SkillPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillPostService {

    private final SkillPostRepository skillPostRepository;

    // Constructor injection of SkillPostRepository
    @Autowired
    public SkillPostService(SkillPostRepository skillPostRepository) {
        this.skillPostRepository = skillPostRepository;
    }

    // Method to create a new skill post
    public SkillPost createPost(SkillPost skillPost) {
        return skillPostRepository.save(skillPost);
    }

    // Method to get all skill posts
    public List<SkillPost> getAllPosts() {
        return skillPostRepository.findAll();
    }

    // Method to get a single skill post by its ID
    public Optional<SkillPost> getPostById(String id) {
        return skillPostRepository.findById(id);
    }

    // Method to update an existing skill post
    public SkillPost updatePost(String id, SkillPost skillPost) {
        skillPost.setId(id); // Ensure the ID is set for update
        return skillPostRepository.save(skillPost);
    }

    // Method to delete a skill post by its ID
    public void deletePost(String id) {
        skillPostRepository.deleteById(id);
    }
}
