-- 1. Xóa bảng cũ nếu tồn tại (theo thứ tự bảng con trước, bảng cha sau)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

-- 2. Tạo bảng Tác giả với ràng buộc UNIQUE cho cột name
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- 3. Tạo bảng Sách
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- 4. Tạo bảng Đánh giá
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    review_text TEXT NOT NULL,
    book_id INT NOT NULL,
    CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE
);