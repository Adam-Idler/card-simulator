import styled from "styled-components";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10001;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .8);
`;

const ModalInner = styled.div`
  width: 60%;
  height: 40%;
  min-height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameModal = ({ style, children }) => {
  return (
    <Modal style={style}>
      <ModalInner>
        {children}
      </ModalInner>
    </Modal>
  )
}