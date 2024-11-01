//This is the homepage for Admin. Notice borad is appear in here
import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import NoticeBoard from '../components/NoticeBoard';
import SemesterConfig from '../components/SemesterConfig';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div>
      <AdminNavBar />
      <div className='admin-notice-board-container'></div>
      <NoticeBoard isAdmin={true} />
      <SemesterConfig />
      <div></div>
    </div>
  );
};

export default AdminPage;
