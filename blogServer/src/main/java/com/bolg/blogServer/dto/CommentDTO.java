package com.bolg.blogServer.dto;

import lombok.Data;
import java.util.Date;

@Data
public class CommentDTO {

    private Long id;

    private String content;

    private Date createdAt;

    private String username;

    private Long postId;

}
