import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from "react-cookie";

const Comment = ({ id }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    let [cookies] = useCookies(['accessToken', 'user_id']);

    const handleCommentSubmit = async () => {
        const commentData = {
//            user_id: cookies.user_id,
//            id: id,
            comment: newComment
        };

        try {
            const response = await axios.post(
                `http://localhost:8082/api/v1/auth/n/saveComment/${id}`,
                commentData,
                {
                    params: {
                        user_id: cookies.user_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + cookies.accessToken
                    }
                }
            );

            setComments([...comments, { ...commentData, id: response.data }]);
            setNewComment('');

            alert('댓글이 성공적으로 작성되었습니다.');
        } catch (error) {
            console.error("Error saving comment:", error);
            alert('댓글 작성 중 오류가 발생했습니다.');
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    return (
        <div>
            <textarea value={newComment} onChange={handleChange} />
            <button onClick={handleCommentSubmit}>Submit Comment</button>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.user_id}</p>
                        <p>{comment.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;
