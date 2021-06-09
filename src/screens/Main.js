import React, { useEffect, useState } from "react";

import {
  Tab,
  Row,
  Col,
  Nav,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Button,
  Image,
  Jumbotron,
  Table,
  Alert,
} from "react-bootstrap";

import { GetArticle, GetUserInfo } from "../utils/ApiConfig";
import { Link } from "react-router-dom";
import { tokenData, udata } from "../Apollo";

const ListArticle = (props) => {
  const { article } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ width: "100%", textAlign: "center" }}>제목</th>
        </tr>
      </thead>
      <tbody>
        {article &&
          article.slice(0, 5).map((a) => {
            return (
              <tr key={a.id}>
                <td style={{ textAlign: "center" }}>{a.title}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

const ControlledTabs = (props) => {
  const [show, setShow] = React.useState(true);
  const { article } = props;

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link
                eventKey="HotArticle"
                active={show === "HotArticle"}
                onMouseEnter={() => setShow("HotArticle")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                HOT 게시판
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="FreeArticle"
                active={show === "FreeArticle"}
                onMouseEnter={() => setShow("FreeArticle")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                자유 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="InfoArticle"
                active={show === "InfoArticle"}
                onMouseEnter={() => setShow("InfoArticle")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                정보 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="MatchingArticle"
                active={show === "MatchingArticle"}
                onMouseEnter={() => setShow("MatchingArticle")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                매칭 게시판
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="AdvertiseArticle"
                active={show === "AdvertiseArticle"}
                onMouseEnter={() => setShow("AdvertiseArticle")}
                onMouseLeave={() => setShow(false)}
                onClick={() => {
                  props.props.history.push(`/post/${show}`);
                }}
              >
                홍보 게시판
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={7}>
          <Tab.Content>
            <Tab.Pane eventKey="HotArticle" active={show === "HotArticle"}>
              <ListArticle data={article} />
            </Tab.Pane>
            <Tab.Pane eventKey="FreeArticle" active={show === "FreeArticle"}>
              <ListArticle data={article} />
            </Tab.Pane>
            <Tab.Pane eventKey="InfoArticle" active={show === "InfoArticle"}>
              <ListArticle data={article} />
            </Tab.Pane>
            <Tab.Pane
              eventKey="MatchingArticle"
              active={show === "MatchingArticle"}
            >
              <ListArticle data={article} />
            </Tab.Pane>
            <Tab.Pane
              eventKey="AdvertiseArticle"
              active={show === "AdvertiseArticle"}
            >
              <ListArticle data={article} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
        <Col sm={3}>
          <Alert variant="dark">
            <Alert.Heading>업데이트 중..</Alert.Heading>
            <p>2021-06-03 메인페이지 작업 완료</p>
            <hr />
            <p className="mb-0">추가 기능 구현중..</p>
          </Alert>
        </Col>
      </Row>
    </Tab.Container>
  );
};

const ControlledUserInfo = (props) => {
  const { userData, prop } = props;

  console.log(userData);
  return (
    <Container>
      <Card style={{ width: "100%" }} className="text-center">
        <Image
          variant="top"
          src="./test.png"
          style={{ maxWidth: "13rem", padding: "15px" }}
          roundedCircle
          className="mx-auto"
        />

        <Card.Body>
          <Card.Title>{userData ? userData.nickname : "Null"}</Card.Title>
          <Card.Text>{userData ? userData.username : "Null"}</Card.Text>
          <Link to="/user">
            <Button style={{ margin: "10px" }}>내 정보</Button>
          </Link>

          <Button
            onClick={() => {
              localStorage.removeItem("TOKEN");
              tokenData(null);
              prop.history.push("/");
            }}
          >
            로그아웃
          </Button>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <Card.Link href="#">내가 쓴 글</Card.Link>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Link href="#">댓글 단 글</Card.Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  );
};

function Main(props) {
  const [article, setArticle] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!tokenData()) props.history.push("/login");
  });
  useEffect(() => {
    if (tokenData()) {
      GetUserInfo();
      GetArticle({ setArticle: setArticle });
    }
  }, []);

  return (
    <Container fluid>
      <Col md={12} style={{ marginTop: "1.5rem" }}>
        <Row>
          <Col md={9}>
            <Jumbotron>
              <h1>HighSchool Time 공사중..</h1>
              <p>팀명 : 배추추</p>
              <p>팀원 : 배서현, 박상호, 황선형</p>
              <p>
                <Link to="/notice">
                  <Button variant="primary">공지사항 확인</Button>
                </Link>
              </p>
            </Jumbotron>
          </Col>
          <Col md={3}>
            <ControlledUserInfo userData={udata()} prop={props} />
          </Col>
        </Row>

        <Row style={{ marginTop: "1.5rem" }}>
          <Container style={{ height: "300px" }} fluid>
            <ControlledTabs props={props} article={article} />
          </Container>
        </Row>
      </Col>
    </Container>
  );
}

export default Main;
