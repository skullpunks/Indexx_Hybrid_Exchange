import * as React from 'react';
import { useClickAway } from '@uidotdev/usehooks';
// import { closeIcon } from "./icons";

export default function ClickAway() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const handleOpenModal = () => {
    if (isOpen === false) {
      console.log('inn');
      setIsOpen(true);
    }
  };

  return (
    <>
      <section>
        <h1>useClickAway</h1>
        <button className="link" onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
    </>
  );
}
