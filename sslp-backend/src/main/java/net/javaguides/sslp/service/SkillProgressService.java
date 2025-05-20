package net.javaguides.sslp.service;

import net.javaguides.sslp.model.SkillProgress;
import java.util.List;

public interface SkillProgressService {
    SkillProgress createProgress(SkillProgress progress);
    SkillProgress getProgressById(String id);
    List<SkillProgress> getAllProgress();
    List<SkillProgress> getProgressByUser(String userId);
    SkillProgress updateProgress(String id, SkillProgress progress);
    void deleteProgress(String id);
}
