package net.javaguides.sslp.service;

import net.javaguides.sslp.model.SkillPost;

import java.util.List;

public interface SkillPostService {
    SkillPost createPost(SkillPost post);
    List<SkillPost> getAllPosts();
    SkillPost getPostById(Long id);
    SkillPost updatePost(Long id, SkillPost updatedPost);
    void deletePost(Long id);
}
