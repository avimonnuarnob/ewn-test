/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { ReactNode } from 'react';
import useDelayUnmount from '../hooks/useDelayUnmount';

interface ModalType {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

function Modal(props: ModalType) {
  const shouldRenderChild = useDelayUnmount(props.isOpen, 100);
  const mountedStyle = { animation: 'inAnimation 200ms ease-in' };
  const unmountedStyle = { animation: 'outAnimation 100ms ease-in' };

  return (
    <>
      {shouldRenderChild && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-box"
            style={props.isOpen ? mountedStyle : unmountedStyle}
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
