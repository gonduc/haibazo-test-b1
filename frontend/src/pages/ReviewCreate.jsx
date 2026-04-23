import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const ReviewCreate = () => {
    const [bookId, setBookId] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [books, setBooks] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/books?page=0&size=100').then(res => setBooks(res.data.content));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = {};
        if (!bookId) errs.book = '* Please select book';
        if (!reviewText.trim()) errs.review = '* Please enter review';
        
        if (Object.keys(errs).length > 0) return setErrors(errs);

        try {
            await axiosClient.post('/reviews', { 
                book: { id: bookId }, 
                reviewText: reviewText.trim() 
            });
            navigate('/reviews');
        } catch (err) { console.error(err); }
    };

    return (
        <Container className="p-4" style={{ maxWidth: '600px', marginLeft: 0 }}>
            <h3 className="mb-4">Thêm mới Đánh giá</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                        <Form.Label className="me-3 mb-0 fw-bold" style={{ width: '80px' }}>Book</Form.Label>
                        <Form.Select value={bookId} onChange={e => setBookId(e.target.value)} isInvalid={!!errors.book}>
                            <option value="">-- Chọn sách --</option>
                            {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                        </Form.Select>
                    </div>
                    {errors.book && <div className="text-danger mt-1" style={{ marginLeft: '95px' }}>{errors.book}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <div className="d-flex align-items-start">
                        <Form.Label className="me-3 mt-2 fw-bold" style={{ width: '80px' }}>Review</Form.Label>
                        <Form.Control as="textarea" rows={4} value={reviewText} onChange={e => setReviewText(e.target.value)} isInvalid={!!errors.review} />
                    </div>
                    {errors.review && <div className="text-danger mt-1" style={{ marginLeft: '95px' }}>{errors.review}</div>}
                </Form.Group>

                <div style={{ marginLeft: '95px' }}>
                    <Button variant="info" type="submit" className="text-white fw-bold">Create</Button>
                </div>
            </Form>
        </Container>
    );
};

export default ReviewCreate;