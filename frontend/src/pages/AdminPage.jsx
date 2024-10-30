//This is the homepage for Admin. Notice borad is appear in here
import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import NoticeBoard from '../components/NoticeBoard';

const AdminPage = () => {
  return (
    <div>
      <AdminNavBar />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <NoticeBoard isAdmin={true} />
    </div>
  );
};

export default AdminPage;
