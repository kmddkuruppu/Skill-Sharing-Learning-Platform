package net.javaguides.sslp.service;

import net.javaguides.sslp.model.Skill;
import net.javaguides.sslp.repo.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<Skill> getSkillById(String id) {
        return skillRepository.findById(id);
    }

    public Skill updateSkill(String id, Skill updatedSkill) {
        updatedSkill.setId(id);
        return skillRepository.save(updatedSkill);
    }

    public void deleteSkill(String id) {
        skillRepository.deleteById(id);
    }
}
