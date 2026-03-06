package com.bolg.blogServer.repository;

import com.bolg.blogServer.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByNameContaining(String name);

    List<Post> findAllByUserId(Long user_id);

    List<Post> findAllByTagsIn(List<String> tags);

    List<Post> findAllByCategoryId(Long categoryId);
}
