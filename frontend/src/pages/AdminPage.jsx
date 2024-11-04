//This is the homepage for Admin. Notice borad is appear in here
import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import NoticeBoard from '../components/NoticeBoard';
import Footer from '../components/Footer';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div>
      <AdminNavBar />
      <div className='admin-notice-board-container'>
      <NoticeBoard isAdmin={true} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
