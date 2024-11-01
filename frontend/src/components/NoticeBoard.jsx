import React, { useEffect, useState } from 'react';
import noticeAPI from '../api/notice';
import './NoticeBoard.css'; // Ensure you import the CSS file

const NoticeBoard = ({ isAdmin }) => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await noticeAPI.getAllNotices();
      setNotices(data);
    };

    fetchNotices();
  }, [notices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await noticeAPI.updateNotice(editId, title, content);
        setEditId(null);
      } else {
        await noticeAPI.createNotice(title, content);
      }
      setTitle('');
      setContent('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error submitting notice:', error);
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setContent(notice.content);
    setEditId(notice._id);
    setShowEditPopup(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await noticeAPI.updateNotice(editId, title, content);
      setEditId(null);
      setTitle('');
      setContent('');
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (noticeToDelete) {
        await noticeAPI.deleteNotice(noticeToDelete._id);
        setShowDeleteConfirm(false);
        setNoticeToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const showDeleteConfirmation = (notice) => {
    setNoticeToDelete(notice);
    setShowDeleteConfirm(true);
  };

  const hideDeleteConfirmation = () => {
    setShowDeleteConfirm(false);
    setNoticeToDelete(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="notice-board-container">
      <h2>Notice Board</h2>
      <div className="notice-cards">
        {notices.map(notice => (
          <div key={notice._id} className="notice-card">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            {isAdmin && (
              <div className="notice-card-actions">
                <button className="edit-button" onClick={() => handleEdit(notice)}>Edit</button>
                <button className="delete-button" onClick={() => showDeleteConfirmation(notice)}>Delete</button>
              </div>
            )}
          </div>
        ))}
        {notices.length > 0 && isAdmin && !showAddForm && (
          <button className="notice-board-plus-button" onClick={toggleAddForm}>+</button>
        )}
      </div>

      {notices.length === 0 && isAdmin && !showAddForm && (
        <button className="notice-board-plus-button" onClick={toggleAddForm}>+</button>
      )}

      {showAddForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editId ? 'Edit Notice' : 'Add Notice'}</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <label>Content: </label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>
              <button type="submit" className="notice-board-popup-update-button">
                {editId ? 'Update Notice' : 'Add Notice'}
              </button>
              <button type="button" className="notice-board-popup-cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="popup">
          <div className="popup-content">
            <p>Are You Sure You Want to Delete?</p>
            <button className="notice-board-popup-stay-button" onClick={hideDeleteConfirmation}>Stay</button>
            <button className="notice-board-popup-yes-button" onClick={handleDelete}>Yes</button>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Edit Notice</h3>
            <form onSubmit={handleUpdate}>
              <div>
                <label>Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <label>Content: </label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
              </div>
              <button type="submit" className="notice-board-popup-update-button">Update Notice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
