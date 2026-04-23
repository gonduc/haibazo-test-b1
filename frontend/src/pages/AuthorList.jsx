import React, { useState, useEffect } from 'react';
import { Table, Pagination, Container } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

const AuthorList = () => {
    // Khai báo đầy đủ các State
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Chuyển hàm fetchAuthors vào hẳn bên trong useEffect
        const fetchAuthors = async (page) => {
            try {
                const response = await axiosClient.get(`/authors?page=${page}&size=5`);
                setAuthors(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải danh sách tác giả:", error);
            }
        };

        // Gọi hàm ngay tại đây
        fetchAuthors(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    return (
        <Container className="p-4">
            <h3 className="mb-4">Danh sách Tác giả</h3>
            
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Books</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Chưa có dữ liệu. Hãy thêm mới!</td>
                        </tr>
                    ) : (
                        authors.map((author, index) => (
                            <tr key={author.id}>
                                <td>{currentPage * 5 + index + 1}</td>
                                <td>{author.name}</td>
                                <td>{author.bookCount || 0}</td>
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

            {/* Bỏ điều kiện totalPages > 1, bọc trong thẻ div để đẩy sang phải */}
            <div className="d-flex justify-content-end mt-3">
                <Pagination>
                    <Pagination.Prev 
                        disabled={currentPage === 0} 
                        onClick={() => handlePageChange(currentPage - 1)} 
                    />
                    {/* Luôn lặp ít nhất 1 lần để hiển thị trang 1 */}
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

export default AuthorList;