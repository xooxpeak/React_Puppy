import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav2 from "../components/Nav2";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";

 
let EditBoard = () => {
  let { id } = useParams();

  let [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);

  // 쿠키 가져오기
  let [cookies] = useCookies(["accessToken"]);
  let navigate = useNavigate();

  // 서버로부터 해당 게시글 정보를 가져옴
  useEffect(() => {
    axios.get(`http://localhost:8082/api/v1/auth/n/board?id=${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    })
      .then((res) => {
        const { board } = res.data;
        console.log("API Response:", board); 
        setFormData({
          title: board.title || "",
          content: board.content || "",
        });
        setLoading(false);
        console.log("Updated formData:", { title: board.title, content: board.content });
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, [id, cookies.accessToken]);


    // 입력 필드의 변경을 상태에 반영
    let handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
  };


  let handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 게시글을 서버에 보냄
    axios
      .put(
        `http://localhost:8082/api/v1/auth/n/updateBoard?id=${id}`, formData, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("게시글이 성공적으로 수정되었습니다:", res.data);
        alert("게시글이 성공적으로 수정되었습니다!")
        navigate("/board");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const { title, content } = formData;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Nav2 />
      </div>
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        <strong>📝글 수정하기</strong>
      </h3>

      <div className="board-form-container">
        <form className="board-form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-group flex-nowrap input-group-lg">
              <span className="input-group-text" id="addon-wrapping">
                제목
              </span>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="input-group input-group-lg">
              <span className="input-group-text">내용</span>
              <textarea
                className="form-control"
                rows="3"
                name="content"
                value={content}
                onChange={handleChange}
                style={{ resize: "none", fontSize: "15px" }}
                required
              />
            </div>
          </div>
          <div className="form-group d-grid gap-2 d-md-flex justify-content-md-end">
            <div className="form-group button-group">
              <button type="submit" className="saveBtn">
                수정하기
              </button>
              <button
                type="button"
                className="listBtn"
                onClick={() => (window.location.href = "/Board")}
              >
                취소하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBoard;
