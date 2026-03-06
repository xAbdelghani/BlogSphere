package com.bolg.blogServer.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class PostDTO {

    private Long id;

    private String name;

    private String content;

    private String img;

    private Date date;

    private int likeCount;

    private boolean liked;

    private int viewCount;

    private List<String> tags;

    private Long categoryId;

    private String categoryName;

    private String username;

}
