package com.voting.controller;

import com.voting.payload.response.ResultDto;
import com.voting.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    VoteRepository voteRepository;

    @GetMapping
    public List<ResultDto> getResults() {
        List<Object[]> rawResults = voteRepository.countVotesByCandidate();
        return rawResults.stream()
                .map(obj -> new ResultDto((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());
    }
}
