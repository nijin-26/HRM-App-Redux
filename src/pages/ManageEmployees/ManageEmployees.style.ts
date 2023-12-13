import styled from "styled-components";
import { Table } from "../../components";

export const StyledManageEmployeesWrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 25px;
  --table-control-field-max-height: 40px;

  & .table-control-field {
    max-height: var(--table-control-field-max-height);
  }

  & .employees-table-controls {
    display: flex;
    gap: 15px;
  }
`;

export const StyledEmployeesTable = styled(Table)`
  & .employee-actions {
    padding-left: 0;
    margin: 0;
    list-style: none;
    align-items: center;
    gap: 25px;

    & li button,
    & li a {
      padding: 0;
      align-items: center;
    }

    & li span {
      color: #000;

      &:hover {
        scale: 1.2;
        font-variation-settings: "FILL" 1;
      }
    }

    & .view-emp-btn span {
      color: green;
    }

    & .edit-emp-btn span {
      color: var(--edit-clr);
    }

    & .delete-emp-btn span {
      color: red;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
