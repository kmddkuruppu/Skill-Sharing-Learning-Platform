package net.javaguides.sslp.service.impl;

import net.javaguides.sslp.model.Learning;
import net.javaguides.sslp.repo.LearningRepository;
import net.javaguides.sslp.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningServiceImpl implements LearningService {

    @Autowired
    private LearningRepository learningRepository;

    @Override
    public Learning createLearning(Learning learning) {
        return learningRepository.save(learning);
    }

    @Override
    public List<Learning> getAllLearnings() {
        return learningRepository.findAll();
    }

    @Override
    public Optional<Learning> getLearningById(String id) {
        return learningRepository.findById(id);
    }

    @Override
    public Learning updateLearning(String id, Learning updatedLearning) {
        updatedLearning.setId(id);
        return learningRepository.save(updatedLearning);
    }

    @Override
    public void deleteLearning(String id) {
        learningRepository.deleteById(id);
    }
}
