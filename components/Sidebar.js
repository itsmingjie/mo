import Link from "next/link";
import styled from "styled-components";

import Topbar from "../components/Topbar";

const Container = styled.div`
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 240px !important;
`;

const Sidebar = () => {
  return (
    <>
      <Container>
        <Topbar>
          <Link href="/">
            <a>墨 · Mo</a>
          </Link>
        </Topbar>
      </Container>
    </>
  );
};

module.exports = Sidebar;
