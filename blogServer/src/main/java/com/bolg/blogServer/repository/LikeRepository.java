package com.bolg.blogServer.repository;

import com.bolg.blogServer.entity.Like;
import com.bolg.blogServer.entity.Post;
import com.bolg.blogServer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByPostAndUser(Post post, User user);

    int countByPost(Post post);

    List<Like> findByPostInAndUser(List<Post> posts, User user);

    @Query("SELECT l.post.id, COUNT(l) FROM Like l WHERE l.post IN :posts GROUP BY l.post.id")
    List<Object[]> countLikesByPostIn(@Param("posts") List<Post> posts);
}
