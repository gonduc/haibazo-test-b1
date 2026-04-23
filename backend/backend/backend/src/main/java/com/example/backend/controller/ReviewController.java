package com.example.backend.controller;

import com.example.backend.model.Review;
import com.example.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<Page<Review>> getAllReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        Page<Review> reviews = reviewService.getReviews(PageRequest.of(page, size));
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        // Validate cơ bản: Nội dung đánh giá không được trống và phải thuộc về 1 cuốn sách
        if (review.getReviewText() == null || review.getReviewText().trim().isEmpty() || review.getBook() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reviewService.createReview(review));
    }
}