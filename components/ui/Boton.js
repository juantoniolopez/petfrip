import styled from "@emotion/styled";

const Boton = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  border-radius: 0.7rem;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  background-color: ${(props) => (props.bgColor ? "#01687f" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: #0389a6;
    color: white;
  }
`;

export default Boton;
