import { useState } from 'react';

function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    console.log('hello');
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
}

export default useModal;
