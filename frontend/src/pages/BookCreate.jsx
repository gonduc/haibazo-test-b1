import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authors, setAuthors] = useState([]); // Chứa danh sách tác giả cho Dropdown
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Lấy danh sách tác giả khi vừa vào trang
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                // Lấy nhiều một chút để đủ hiển thị trong dropdown
                const response = await axiosClient.get('/authors?page=0&size=100');
                setAuthors(response.data.content);
            } catch (err) {
                console.error("Lỗi khi tải tác giả:", err);
            }
        };
        fetchAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentErrors = {};

        // Validation kiểm tra rỗng
        if (!title.trim()) currentErrors.title = '* Please enter title';
        if (!authorId) currentErrors.author = '* Please select author';

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            // Gửi dữ liệu lên Backend
            await axiosClient.post('/books', { 
                title: title.trim(),
                author: { id: authorId } 
            });
            navigate('/books'); // Chuyển về trang list sách nếu thành công
        } catch (err) {
            console.error("Lỗi khi thêm sách:", err);
            
            // KIỂM TRA LỜI NHẮN TỪ BACKEND
            if (err.response && err.response.data && typeof err.response.data === 'string') {
                // Nếu trùng tên sách, gán câu chửi vào lỗi của ô Title
                setErrors({ title: err.response.data }); 
            } else {
                // Lỗi chung (ví dụ mất mạng, server sập...)
                setErrors({ general: 'Có lỗi xảy ra khi lưu vào hệ thống!' });
            }
            
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="p-4" style={{ maxWidth: '600px', marginLeft: 0 }}>
            <h3 className="mb-4">Thêm mới Sách</h3>
            
            <Form onSubmit={handleSubmit}>
                {/* Nhập Tên Sách */}
                <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                        <Form.Label className="me-3 mb-0 fw-bold" style={{ width: '80px' }}>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            isInvalid={!!errors.title}
                        />
                    </div>
                    {errors.title && <div className="text-danger mt-1" style={{ marginLeft: '95px', fontSize: '0.9em' }}>{errors.title}</div>}
                </Form.Group>

                {/* Chọn Tác Giả (Dropdown) */}
                <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                        <Form.Label className="me-3 mb-0 fw-bold" style={{ width: '80px' }}>Author</Form.Label>
                        <Form.Select 
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                            isInvalid={!!errors.author}
                        >
                            <option value="">-- Chọn tác giả --</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    {errors.author && <div className="text-danger mt-1" style={{ marginLeft: '95px', fontSize: '0.9em' }}>{errors.author}</div>}
                </Form.Group>

                {/* Hiển thị lỗi chung (nếu có) */}
                {errors.general && <div className="text-danger mb-3 fw-bold" style={{ marginLeft: '95px', fontSize: '0.9em' }}>{errors.general}</div>}

                <div style={{ marginLeft: '95px' }}>
                    <Button 
                        variant="info" 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="px-4 fw-bold text-white"
                        style={{ backgroundColor: '#5bc0de', borderColor: '#46b8da' }}
                    >
                        {isSubmitting ? 'Đang lưu...' : 'Create'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default BookCreate;