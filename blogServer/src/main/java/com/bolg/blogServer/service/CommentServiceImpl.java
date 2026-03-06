package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.CommentDTO;
import com.bolg.blogServer.entity.Comment;
import com.bolg.blogServer.entity.Post;
import com.bolg.blogServer.utill.JwtUtil;
import com.bolg.blogServer.repository.CommentRepository;
import com.bolg.blogServer.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public CommentDTO createComment(Long postId, String content){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isPresent()){
            Comment comment = new Comment();

            comment.setPost(optionalPost.get());
            comment.setContent(content);
            comment.setUser(jwtUtil.getLoggedInUser());
            comment.setCreatedAt(new Date());

            Comment saved = commentRepository.save(comment);

            CommentDTO dto = new CommentDTO();
            dto.setId(saved.getId());
            dto.setContent(saved.getContent());
            dto.setUsername(saved.getUser().getUsername());
            dto.setCreatedAt(saved.getCreatedAt());

            return dto;
        }
        throw new EntityNotFoundException("Post not found");
    }

    public List<CommentDTO> getCommentsByPostId(Long postId){
        return commentRepository.findByPostId(postId).stream().map(Comment::getCommentDTO).collect(Collectors.toList());
    }
}
