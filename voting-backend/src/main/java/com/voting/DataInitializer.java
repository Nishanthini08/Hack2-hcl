package com.voting;

import com.voting.model.Candidate;
import com.voting.model.User;
import com.voting.repository.CandidateRepository;
import com.voting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (candidateRepository.count() == 0) {
            candidateRepository.saveAll(Arrays.asList(
                    new Candidate(null, "Alice Smith", "Science Club", null),
                    new Candidate(null, "Bob Jones", "Arts Club", null),
                    new Candidate(null, "Charlie Brown", "Sports Club", null)
            ));
        }

        if (userRepository.count() == 0) {
            userRepository.saveAll(Arrays.asList(
                    new User(null, "student1", passwordEncoder.encode("password123"), false),
                    new User(null, "student2", passwordEncoder.encode("password123"), false),
                    new User(null, "student3", passwordEncoder.encode("password123"), false)
            ));
        }
    }
}
