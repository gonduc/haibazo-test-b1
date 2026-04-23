import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuthorList from './pages/AuthorList';
import AuthorCreate from './pages/AuthorCreate';
import BookCreate from './pages/BookCreate';
import BookList from './pages/BookList';
import ReviewList from './pages/ReviewList';
import ReviewCreate from './pages/ReviewCreate';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        
        <div className="flex-grow-1 bg-white">
          <Routes>
            <Route path="/" element={<h2 className="p-4">Welcome to Book Review Dashboard</h2>} />
            
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/create" element={<AuthorCreate />} />
            
            <Route path="/books" element={<BookList />} />
            <Route path="/books/create" element={<BookCreate />} />

            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/create" element={<ReviewCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;