import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container, Button } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchReviews = async (page) => {
            try {
                const response = await axiosClient.get(`/reviews?page=${page}&size=5`);
                setReviews(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải đánh giá:", error);
            }
        };

        fetchReviews(currentPage);
    }, [currentPage]);

    return (
        <Container className="p-4">
            <h3 className="mb-4">Danh sách Đánh giá</h3>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Review</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length === 0 ? (
                        <tr><td colSpan="5" className="text-center">Chưa có đánh giá nào.</td></tr>
                    ) : (
                        reviews.map((r, index) => (
                            <tr key={r.id}>
                                <td>{currentPage * 5 + index + 1}</td>
                                <td>{r.book?.title}</td>
                                <td>{r.book?.author?.name}</td>
                                <td style={{ maxWidth: '400px', wordBreak: 'break-word' }}>
                                    {r.reviewText}
                                </td>
                                <td className="align-middle">
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            title="Sửa"
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                                        />
                                        <input 
                                            type="checkbox" 
                                            title="Xóa"
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
                <Pagination>
                    <Pagination.Prev 
                        disabled={currentPage === 0} 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                    />
                    {[...Array(Math.max(1, totalPages))].map((_, i) => (
                        <Pagination.Item 
                            key={i} 
                            active={i === currentPage} 
                            onClick={() => setCurrentPage(i)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        disabled={currentPage >= Math.max(0, totalPages - 1)} 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                    />
                </Pagination>
            </div>
        </Container>
    );
};

export default ReviewList;