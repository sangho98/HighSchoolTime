import React, { Component, useEffect } from "react";
import "../Stylefolder/Content.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import { assertValidExecutionArguments } from "graphql/execution/execute";
import axios from "axios";
import { LoneSchemaDefinitionRule } from "graphql";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { SERVER_URL } from "../utils/URL";
import { getOperationDefinition } from "@apollo/client/utilities";
import Letter from "./Letter";
import { Modals } from "react-bootstrap";

class Content extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.props = props;
    this.state = {
      content_num: 1,
      boards: [],
      comment: [],
      writeco: "",
      ModalOn: false,
      abc: false,
    };
  }

  LoadContent = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const { params } = this.props.match;
    axios
      .get(SERVER_URL + "/post/" + params.boardlist + "/" + params.num)
      .then(({ data }) => {
        this.setState({
          boards: data,
          comment: data.commentDTOList,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  Sendcomment = async () => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    const { params } = this.props.match;
    console.log(this.state.writeco);
    axios
      .post(SERVER_URL + "/post/" + params.num + "/comment", {
        content: this.state.writeco,
      })
      .then((res) => {
        if (res.data === "failed") {
        } else {
          alert("댓글 작성 완료");
          this.setState({ abc: true });
          this.props.history.push(this.props.location.pathname);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Sendlike = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get(SERVER_URL + `/post/freeboard/${id}/like`)
      .then((res) => {
        if (res.data === "failed") {
        } else {
          alert("좋아요");
          <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  };

  Friendplz = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(SERVER_URL + `/user/${id}`)
      .then((res) => {
        if (res.data === "failed") {
          alert("요청실패");
        } else {
          alert("요청완료");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.LoadContent();
  }

  change_reply = (e) => {
    this.setState({
      writeco: e.target.value,
    });
  };

  openModal = () => {
    this.setState({
      ModalOn: true,
    });
  };
  closeModal = () => {
    this.setState({
      ModalOn: false,
    });
  };
  DeleteBoard = async ({ id }) => {
    let token = localStorage.getItem("TOKEN");
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .delete(SERVER_URL + `/post/${id}`)
      .then((res) => {
        if (res.data === "failed") {
        } else {
          alert("댓글 삭제 완료");
          <Redirect to="this.props.location.pathname" />;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  gotoLetter() {}
  componentDidUpdate() {
    if (this.state.abc) {
      this.LoadContent();
      this.setState({ abc: false });
    }
  }
  render() {
    function comment_id(id) {
      if (id === -1) return "글쓴이";
      else return "익명" + id;
    }
    console.log(this.state.boards);
    return (
      <div className="big_div">
        <div className="content_div">
          <li id="content_title">{this.state.boards.title}</li>
          <button
            onClick={() => {
              this.Sendlike({ id: this.state.boards.id });
            }}
          >
            ♡
          </button>
          <li id="content_content">{this.state.boards.content}</li>
          <li id="content_img"></li>
        </div>

        <div className="write_reply">
          <input onChange={this.change_reply}></input>
          <button onClick={this.Sendcomment}>작성</button>
        </div>

        <div className="reply_div">
          {this.state.comment.map((board) => (
            <tr key={board.id} id="content_content">
              <tr>
                <td className="comment_user">
                  <button onClick={this.openModal}>
                    {comment_id(board.userCount)}
                  </button>
                  <Modal show={this.state.ModalOn} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>원하는 활동을 선택하세요.</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                      <Link to={`/post/freeboard/letter/${board.userId}`}>
                        <button variant="secondary" onClick={this.closeModal}>
                          쪽지보내기
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          console.log(board.userId);
                          this.Friendplz({ id: board.userId });
                        }}
                      >
                        친구 요청
                      </button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
              <tr>
                <td className="comment_text">{board.content}</td>
              </tr>
              <button
                onClick={() => {
                  this.DeleteBoard({ id: board.id });
                }}
              >
                삭제
              </button>
              <p></p>
            </tr>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Content);
//<Link to={`/post/freeboard/letter/${board.userId}`}></Link>
