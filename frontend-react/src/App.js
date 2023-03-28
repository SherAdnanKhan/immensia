import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LoginScreen } from "./screens/LoginScreen";
import TodoForm from "./screens/TodoForm";
import FolderForm from "./screens/FolderForm";
import TodoList from "./screens/TodoList";
import Chat from "./screens/Chat";
import { useSelector } from "react-redux";

const AuthenticatedRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { folders } = useSelector((state) => state.folderList);

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/*" element={<AuthenticatedRoute />}>
            <Route index element={<Chat />} />
            <Route path="TodoForm" element={<TodoForm folders={folders}/>} />
            <Route path="add-folder" element={<FolderForm />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
