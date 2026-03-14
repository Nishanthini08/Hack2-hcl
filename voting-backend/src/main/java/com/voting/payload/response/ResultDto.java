package com.voting.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultDto {
    private String candidateName;
    private Long voteCount;
}
