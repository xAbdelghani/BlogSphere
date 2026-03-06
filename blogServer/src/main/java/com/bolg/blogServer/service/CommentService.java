package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.CommentDTO;
import com.bolg.blogServer.entity.Comment;

import java.util.List;

public interface CommentService {

    CommentDTO createComment(Long postId, String content);

    List<CommentDTO> getCommentsByPostId(Long postId);
}
