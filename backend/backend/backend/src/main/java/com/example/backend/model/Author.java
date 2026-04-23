package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Formula; // Nhớ import thư viện này

@Data
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. Thêm unique = true để cấm nhập trùng tên
    @Column(nullable = false, unique = true) 
    private String name;

    // 2. Phép thuật đếm sách tự động từ bảng books
    @Formula("(SELECT COUNT(*) FROM books b WHERE b.author_id = id)")
    private Integer bookCount;
}