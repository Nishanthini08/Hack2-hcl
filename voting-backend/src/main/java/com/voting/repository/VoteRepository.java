package com.voting.repository;

import com.voting.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT v.candidate.name as candidateName, COUNT(v) as voteCount FROM Vote v GROUP BY v.candidate.name")
    List<Object[]> countVotesByCandidate();
}
