import ReactDom from 'react-dom';
import React from 'react';

type ModalPortalProps = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal-root') as HTMLElement; // 타입 단언 사용
  return ReactDom.createPortal(children, el);
};

export default ModalPortal;
