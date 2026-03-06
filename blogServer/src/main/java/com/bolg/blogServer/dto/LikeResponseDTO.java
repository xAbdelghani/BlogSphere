package com.bolg.blogServer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikeResponseDTO {
    private long likeCount;
    private boolean liked;
}
