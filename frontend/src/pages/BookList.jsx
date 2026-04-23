import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Đưa hàm fetchBooks vào hẳn bên trong useEffect
        const fetchBooks = async (page) => {
            try {
                const response = await axiosClient.get(`/books?page=${page}&size=5`);
                setBooks(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sách:", error);
            }
        };

        // Gọi hàm chạy ngay lập tức
        fetchBooks(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="p-4">
            <h3 className="mb-4">Danh sách Sách</h3>
            
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Chưa có dữ liệu sách.</td>
                        </tr>
                    ) : (
                        books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{currentPage * 5 + index + 1}</td>
                                <td>{book.title}</td>
                                {/* Chú ý: Truy xuất tên tác giả thông qua object author */}
                                <td>{book.author?.name}</td> 
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

            {/* Phân trang được đẩy sang phải và luôn hiện trang 1 */}
            <div className="d-flex justify-content-end mt-3">
                <Pagination>
                    <Pagination.Prev 
                        disabled={currentPage === 0} 
                        onClick={() => handlePageChange(currentPage - 1)} 
                    />
                    {[...Array(Math.max(1, totalPages))].map((_, index) => (
                        <Pagination.Item 
                            key={index} 
                            active={index === currentPage}
                            onClick={() => handlePageChange(index)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        disabled={currentPage >= Math.max(0, totalPages - 1)} 
                        onClick={() => handlePageChange(currentPage + 1)} 
                    />
                </Pagination>
            </div>
        </Container>
    );
};

export default BookList;