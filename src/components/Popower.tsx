import React, { useRef, useState } from 'react';
import { useClickOutside } from 'hooks/useClickOutside';
type PopoverProps = {
  content: React.ReactNode;
};
const Popover: React.FC<PopoverProps> = (props) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useClickOutside(ref, () => setVisible(false));
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <>
        {visible && <div style={{ position: 'absolute', top: 0, right: 0 }}>{props.content}</div>}
        {<div onClick={() => setVisible(true)}>{props.children}</div>}
      </>
    </div>
  );
};

export default Popover;
