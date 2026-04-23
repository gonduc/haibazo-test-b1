package com.example.backend; // Chú ý: Sửa lại cho đúng package của bạn

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Cấu hình thả ga cho ông Vercel
        config.setAllowCredentials(true);
        config.addAllowedOrigin("https://haibazo-test-b1.vercel.app"); // Đúng link Vercel của bạn
        config.addAllowedHeader("*"); // Cho phép mọi loại Header
        config.addAllowedMethod("*"); // Cho phép mọi lệnh (GET, POST, PUT, DELETE, OPTIONS)
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}