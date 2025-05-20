package net.javaguides.sslp.service.impl;

import net.javaguides.sslp.model.SkillProgress;
import net.javaguides.sslp.repo.SkillProgressRepository;
import net.javaguides.sslp.service.SkillProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillProgressServiceImpl implements SkillProgressService {

    @Autowired
    private SkillProgressRepository repository;

    @Override
    public SkillProgress createProgress(SkillProgress progress) {
        return repository.save(progress);
    }

    @Override
    public SkillProgress getProgressById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<SkillProgress> getAllProgress() {
        return repository.findAll();
    }

    @Override
    public List<SkillProgress> getProgressByUser(String userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public SkillProgress updateProgress(String id, SkillProgress progress) {
        Optional<SkillProgress> existing = repository.findById(id);
        if (existing.isPresent()) {
            progress.setId(id);
            return repository.save(progress);
        }
        return null;
    }

    @Override
    public void deleteProgress(String id) {
        repository.deleteById(id);
    }
}
