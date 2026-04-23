import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const AuthorCreate = () => {
    // State lưu trữ dữ liệu nhập vào và trạng thái lỗi
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Hook dùng để chuyển hướng trang sau khi thêm thành công
    const navigate = useNavigate();

    // Hàm xử lý khi bấm nút Create
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt reload lại trang
        
        // 1. Validation: Kiểm tra xem đã nhập tên chưa
        if (!name.trim()) {
            setError('* Please enter name');
            return; // Dừng lại, không gọi API
        }

        // Xóa lỗi nếu đã nhập hợp lệ
        setError('');
        setIsSubmitting(true);

        // 2. Gọi API POST để lưu vào Database
        try {
            await axiosClient.post('/authors', { name: name.trim() });
            
            // Nếu thành công, chuyển hướng người dùng về lại trang Danh sách
            navigate('/authors');
        } catch (err) {
            console.error("Lỗi khi thêm tác giả:", err);
            
            // KIỂM TRA LỜI NHẮN TỪ BACKEND
            if (err.response && err.response.data && typeof err.response.data === 'string') {
                // Nếu Backend ném về câu "Tên tác giả đã tồn tại..." thì in câu đó ra
                setError(err.response.data);
            } else {
                // Nếu lỗi mạng hoặc lỗi khác không xác định thì dùng câu dự phòng này
                setError('Có lỗi xảy ra khi lưu vào hệ thống!');
            }
            
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="p-4" style={{ maxWidth: '600px', marginLeft: 0 }}>
            <h3 className="mb-4">Thêm mới Tác giả</h3>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                        <Form.Label className="me-3 mb-0 fw-bold" style={{ width: '80px' }}>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên tác giả..."
                            isInvalid={!!error} // Viền đỏ nếu có lỗi
                        />
                    </div>
                    {/* Hiển thị dòng chữ lỗi màu đỏ giống y hệt wireframe */}
                    {error && (
                        <div className="text-danger mt-1" style={{ marginLeft: '95px', fontSize: '0.9em' }}>
                            {error}
                        </div>
                    )}
                </Form.Group>

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

export default AuthorCreate;