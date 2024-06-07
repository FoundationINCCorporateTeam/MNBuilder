import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop} style={{ minHeight: '100px', border: '1px dashed gray', background: isOver ? 'lightgreen' : 'white' }}>
      Drop here
    </div>
  );
};

export default DropZone;
