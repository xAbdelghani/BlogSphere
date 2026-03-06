package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {

    List<CategoryDTO> getAllCategories();

}
