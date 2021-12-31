import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  width: min-content;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export default function Layout({ children }) {
  return (
    <>
      <Main>{children}</Main>
    </>
  );
}
