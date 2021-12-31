import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0;
  height: 60px;
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--title-color);
  text-transform: uppercase;
`;

const Topbar = ({ children }) => {
  return (
    <>
      <Container>
        <Title>{children}</Title>
      </Container>
    </>
  );
};

module.exports = Topbar;
