package com.example.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Mở cửa cho TẤT CẢ các đường dẫn API
        registry.addMapping("/**")
                // CHỈ CHO PHÉP ĐÚNG ÔNG VERCEL NÀY VÀO (Không dùng dấu * nữa)
                .allowedOrigins("https://haibazo-test-b1.vercel.app")
                // Cho phép tất cả các hành động Thêm, Sửa, Xóa, Lấy
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // Rất quan trọng nếu Frontend có dùng Axios
    }
}