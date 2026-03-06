package com.bolg.blogServer.service;

import com.bolg.blogServer.dto.CategoryDTO;
import com.bolg.blogServer.entity.Category;
import com.bolg.blogServer.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(Category::getCategoryDTO).collect(Collectors.toList());
    }
}
