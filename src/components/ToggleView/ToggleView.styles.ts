import styled from "styled-components";

export const ToggleViewWrapper = styled.div`
  width: max-content;
  border: 1px solid #000;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  & > div.active {
    background-color: var(--edit-clr);
  }

  & > div:hover > span {
    scale: 1.03;
  }
`;
