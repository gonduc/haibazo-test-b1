import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
    const location = useLocation();

    // Hàm tiện ích để kiểm tra xem link có đang active không
    const isActive = (path) => location.pathname === path;

    // Style chung cho các link khi active (nền xám, chữ trắng, bo góc nhẹ)
    const activeStyle = "bg-secondary text-white fw-bold rounded";
    const normalStyle = "text-secondary";

    return (
        <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
            {/* Tiêu đề */}
            <div className="bg-dark text-white p-3 text-center fw-bold">
                HAIBAZO BOOK REVIEW
            </div>
            
            <Nav className="flex-column p-3">
                {/* ---------- PHẦN TÁC GIẢ ---------- */}
                <div className="fw-bold mb-2">📁 Authors</div>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/authors" 
                        className={`ps-4 ${isActive('/authors') ? activeStyle : normalStyle}`}
                    >
                        List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/authors/create" 
                        className={`ps-4 ${isActive('/authors/create') ? activeStyle : normalStyle}`}
                    >
                        Create
                    </Nav.Link>
                </Nav.Item>

                {/* ---------- PHẦN SÁCH ---------- */}
                <div className="fw-bold mt-3 mb-2">📚 Books</div>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/books" 
                        className={`ps-4 ${isActive('/books') ? activeStyle : normalStyle}`}
                    >
                        List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/books/create" 
                        className={`ps-4 ${isActive('/books/create') ? activeStyle : normalStyle}`}
                    >
                        Create
                    </Nav.Link>
                </Nav.Item>

                {/* ---------- PHẦN REVIEWS ---------- */}
                <div className="fw-bold mt-3 mb-2">💬 Reviews</div>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/reviews" 
                        className={`ps-4 ${isActive('/reviews') ? activeStyle : normalStyle}`}
                    >
                        List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-1">
                    <Nav.Link 
                        as={Link} 
                        to="/reviews/create" 
                        className={`ps-4 ${isActive('/reviews/create') ? activeStyle : normalStyle}`}
                    >
                        Create
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;