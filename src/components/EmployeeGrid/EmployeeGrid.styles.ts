import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const NotFoundText = styled.p`
  width: 100%;
  color: red;
  text-align: center;
  text-transform: uppercase;
`;
