package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.LikeResponseDTO;
import com.bolg.blogServer.dto.PostDTO;

import java.util.List;

public interface PostService {

    PostDTO savePost(PostDTO postDTO);

    List<PostDTO> getAllPosts();

    List<PostDTO> getMyPosts();

    void deletePostById(Long postId);

    PostDTO getPostById(Long postId);

    LikeResponseDTO toggleLike(Long postId);

    List<PostDTO> searchByName(String name);

    List<PostDTO> searchPostByTags(List<String> tagList);

    List<PostDTO> searchPostByCategory(Long categoryId);
}
