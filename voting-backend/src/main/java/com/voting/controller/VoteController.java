package com.voting.controller;

import com.voting.model.Candidate;
import com.voting.model.User;
import com.voting.model.Vote;
import com.voting.payload.request.VoteRequest;
import com.voting.payload.response.MessageResponse;
import com.voting.repository.CandidateRepository;
import com.voting.repository.UserRepository;
import com.voting.repository.VoteRepository;
import com.voting.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    VoteRepository voteRepository;

    @PostMapping
    public ResponseEntity<?> castVote(@RequestBody VoteRequest voteRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        User user = userRepository.findById(userDetails.getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found."));
        }

        if (user.isHasVoted()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User has already voted."));
        }

        Candidate candidate = candidateRepository.findById(voteRequest.getCandidateId()).orElse(null);
        if (candidate == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Candidate not found."));
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setCandidate(candidate);
        voteRepository.save(vote);

        user.setHasVoted(true);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Vote cast successfully"));
    }
}
