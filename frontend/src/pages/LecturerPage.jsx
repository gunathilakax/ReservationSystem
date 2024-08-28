//This is the homepage for lecturers. Notice borad is appear in here
import React from 'react';
import LecturerNavBar from '../components/LecturerNavBar';
import NoticeBoard from '../components/NoticeBoard';

const LecturerPage = () => {
  return (
    <div>
      <LecturerNavBar />
      <br/><br/>
      <NoticeBoard isAdmin={false} />
    </div>
  );
};

export default LecturerPage;
