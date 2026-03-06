package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.LikeResponseDTO;
import com.bolg.blogServer.dto.PostDTO;
import com.bolg.blogServer.entity.Category;
import com.bolg.blogServer.entity.Post;
import com.bolg.blogServer.utill.JwtUtil;
import com.bolg.blogServer.repository.CategoryRepository;
import com.bolg.blogServer.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.bolg.blogServer.entity.Like;
import com.bolg.blogServer.entity.User;
import com.bolg.blogServer.repository.LikeRepository;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LikeRepository likeRepository;

    private PostDTO mapPostToDTO(Post post, int likeCount, boolean liked) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setContent(post.getContent());
        postDTO.setName(post.getName());
        postDTO.setDate(post.getDate());
        postDTO.setImg(post.getImg());
        postDTO.setUsername(post.getUser().getName());
        postDTO.setLikeCount(likeCount);
        postDTO.setLiked(liked);
        postDTO.setViewCount(post.getViewCount());
        postDTO.setTags(post.getTags());
        postDTO.setCategoryId(post.getCategory().getId());
        postDTO.setCategoryName(post.getCategory().getName());
        return postDTO;
    }

    private List<PostDTO> mapPostsToDTOs(List<Post> posts) {

        if (posts.isEmpty())
            return Collections.emptyList();

        User currentUser = jwtUtil.getLoggedInUser();

        List<Object[]> likeCounts = likeRepository.countLikesByPostIn(posts);
        Map<Long, Integer> likeCountMap = new HashMap<>();
        for (Object[] result : likeCounts) {
            likeCountMap.put((Long) result[0], ((Number) result[1]).intValue());
        }

        Map<Long, Boolean> likedMap = new HashMap<>();
        if (currentUser != null) {
            List<Like> userLikes = likeRepository.findByPostInAndUser(posts, currentUser);
            for (Like like : userLikes) {
                likedMap.put(like.getPost().getId(), true);
            }
        }

        return posts.stream().map(post -> {
            int likeCount = likeCountMap.getOrDefault(post.getId(), 0);
            boolean liked = likedMap.getOrDefault(post.getId(), false);
            return mapPostToDTO(post, likeCount, liked);
        }).collect(Collectors.toList());
    }

    public PostDTO savePost(PostDTO postDTO) {
        Optional<Category> optionalCategory = categoryRepository.findById(postDTO.getCategoryId());
        if (optionalCategory.isPresent()) {
            Post post = new Post();
            post.setCategory(optionalCategory.get());
            post.setViewCount(0);
            post.setDate(new Date());
            post.setImg(postDTO.getImg());
            post.setContent(postDTO.getContent());
            post.setName(postDTO.getName());
            post.setTags(postDTO.getTags());
            post.setUser(jwtUtil.getLoggedInUser());
            Post savedPost = postRepository.save(post);
            return mapPostToDTO(savedPost, 0, false);
        } else {
            throw new EntityNotFoundException("Category not found");
        }
    }

    public List<PostDTO> getAllPosts() {
        return mapPostsToDTOs(postRepository.findAll());
    }

    @Override
    public List<PostDTO> getMyPosts() {
        return mapPostsToDTOs(postRepository.findAllByUserId(jwtUtil.getLoggedInUser().getId()));
    }

    @Override
    public void deletePostById(Long postId) {
        postRepository.deleteById(postId);
    }

    public PostDTO getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setViewCount(post.getViewCount() + 1);
            Post savedPost = postRepository.save(post);
            int likeCount = likeRepository.countByPost(savedPost);

            User currentUser = jwtUtil.getLoggedInUser();
            boolean isLiked = false;
            if (currentUser != null) {
                isLiked = likeRepository.findByPostAndUser(savedPost, currentUser).isPresent();
            }
            return mapPostToDTO(savedPost, likeCount, isLiked);
        } else {
            throw new EntityNotFoundException("Post not found");
        }
    }

    @Transactional
    public LikeResponseDTO toggleLike(Long postId) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Post not found with id: " + postId));

        User currentUser = jwtUtil.getLoggedInUser();

        if (currentUser == null) {
            throw new RuntimeException("User must be logged in to like a post");
        }

        Optional<Like> existingLike =
                likeRepository.findByPostAndUser(post, currentUser);

        boolean liked;

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            liked = false;
        } else {
            Like newLike = new Like();
            newLike.setPost(post);
            newLike.setUser(currentUser);
            likeRepository.save(newLike);
            liked = true;
        }

        long likeCount = likeRepository.countByPost(post);

        return new LikeResponseDTO(likeCount, liked);
    }
    public List<PostDTO> searchByName(String name) {
        return mapPostsToDTOs(postRepository.findAllByNameContaining(name));
    }

    @Override
    public List<PostDTO> searchPostByTags(List<String> tagList) {
        return mapPostsToDTOs(postRepository.findAllByTagsIn(tagList));
    }

    @Override
    public List<PostDTO> searchPostByCategory(Long categoryId) {
        return mapPostsToDTOs(postRepository.findAllByCategoryId(categoryId));
    }
}
