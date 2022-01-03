import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styled from "styled-components";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Editor from "../components/Editor/Editor";
import NotesList from "../components/NotesList";

const Main = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 640px !important;
  padding: 0;
  margin: 0;
`;

const MainEditor = styled.div`
  padding: 10px 20px 10px;
`;

const App = () => {
  const [editorContent, setEditorContent] = useState("");
  const [notes, setNotes] = useState([]);

  const sendHandler = () => {
    fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        content: editorContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const note = data.note[0];
        setNotes([note, ...notes]);
      });
  };

  return (
    <>
      <Head>
        <title>墨 · Mo</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Sidebar component */}
      <Sidebar />

      <Main>
        <Topbar>Welcome back, Mingjie.</Topbar>
        <MainEditor>
          <Editor setContent={setEditorContent} sendHandler={sendHandler} />
        </MainEditor>
        <NotesList notes={notes} setNotes={setNotes} />
      </Main>
    </>
  );
};

module.exports = App;
