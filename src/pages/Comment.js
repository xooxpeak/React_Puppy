import React from 'react';
import { useEffect, useState } from 'react';
import { useAxios } from '../AxiosContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

let Comment = ({ id }) => {
    let [newComment, setNewComment] = useState('');
    let [comments, setComments] = useState([]);
    const axios = useAxios(); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchComments();
    }, [axios]);

    let fetchComments = async () => {
        try {
            let response = await axios.get(
                `/api/v1/auth/n/comment/${id}`
            );
            setComments(response.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    };


    const handleCommentSubmit = async () => {
        const commentData = {
            comment: newComment
        };

        try {
            const response = await axios.post(
                `/api/v1/auth/n/saveComment/${id}`, commentData
            );

            setComments([...comments, { ...commentData, id: response.data }]);
            setNewComment('');
            console.log('Comment saved:', response.data);
            alert('댓글이 성공적으로 작성되었습니다.');
            navigate('/Board');
        } catch (error) {
            console.error("Error saving comment:", error);
            alert('댓글 작성 중 오류가 발생했습니다.');
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    return (
        <>
        <ul className="list-group">
            <strong>댓글 {comments.length}</strong>
            <hr />
                {comments.map((comment, index) => (
                    <li key={index} className="list-group-item">
                            <strong>ID:</strong> {comment.user_id} 
                            <span className='comment-date'> {comment.comment_date} </span>
                            
                        <div>{comment.comment}</div>
                    </li>
                ))}
            </ul>

        <div className="comment-container">
            <input className="comment-input" value={newComment} onChange={handleChange} placeholder='댓글을 입력해주세요.' />
            <button className="comment-button" onClick={handleCommentSubmit}>등록</button>
        </div>
       </>
    );
};

export default Comment;
