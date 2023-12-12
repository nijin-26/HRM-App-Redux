import styled from "styled-components";

export const CardContainer = styled.div`
  flex: 1 0 300px;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #ccc;
  transition: scale 0.5s;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;

  &:hover {
    scale: 1.02;
  }
`;

export const CardHeader = styled.div`
  height: 80px;
  background-color: var(--primary-clr);
  border-radius: 8px 8px 0 0;
  padding: 16px;

  position: relative;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0);
    width: 82px;
    height: 82px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #fff;
    border: 2px solid var(--primary-clr);
  }

  .icons {
    display: flex;
    justify-content: right;
    gap: 10px;
    color: #fff;
    transition: all 0.3s;
  }

  .icons a {
    color: inherit;
    transition: all 0.3s;
  }

  .icons a:hover {
    color: #000;
  }

  .icons > span {
    transition: all 0.3s;
  }

  .icons > span:hover {
    color: #000;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 28px 20px;
  text-align: center;

  & * {
    margin: 0;
  }

  h3 {
    text-transform: uppercase;
  }

  .role {
    color: gray;
    margin-bottom: 8px;
  }

  .details_wrapper {
    margin: 10px 0;
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }

  .details_wrapper > div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: #000;
  }

  a {
    color: #000;
  }

  a:hover {
    text-decoration: underline;
  }
`;

// ! <<<<<<<<<< Horizontal Card >>>>>>>>>>>>>>>

// export const CardContainer = styled.div`
//   flex: 1 0 350px;
//   max-width: 350px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   box-shadow: 0px 0px 10px #ccc;
//   transition: scale 0.5s;
//   display: flex;
//   align-items: stretch;
//   gap: 12px;
//   cursor: pointer;

//   &:hover {
//     scale: 1.02;
//   }

//   .employee_image_container {
//     padding: 16px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 10px;
//     background-color: var(--primary-clr);
//     color: #fff;
//     border-radius: 8px 0px 0px 8px;
//     font-weight: 500;
//   }

//   img {
//     width: 64px;
//     height: 64px;
//     border-radius: 50%;
//     object-fit: cover;
//     border: 1px solid #fff;
//   }

//   .employee_details {
//     padding: 16px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     & > * {
//       margin: 0;
//     }

//     h3 {
//       text-transform: uppercase;
//     }

//     .role {
//       color: gray;
//       margin-bottom: 8px;
//     }
//   }
// `;
