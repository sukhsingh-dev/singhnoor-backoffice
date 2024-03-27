import { useEffect, useState, useRef } from "react";

const useOutSideClick = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const targetRef = useRef< HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if(targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    };

    document.addEventListener('mousedown', handleOutSideClick);

    return() => {
      document.removeEventListener('mousedown', handleOutSideClick)
    }
  },[])

  return {targetRef, isOpen, setIsOpen};

}

export default useOutSideClick