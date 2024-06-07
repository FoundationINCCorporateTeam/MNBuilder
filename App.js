import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Element from './components/Element';
import DropZone from './components/DropZone';

const App = () => {
  const [elements, setElements] = useState([]);
  
  const handleDrop = (type) => {
    setElements([...elements, type]);
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <div>
          <Element type="text">Text</Element>
          <Element type="image">Image</Element>
          <Element type="button">Button</Element>
        </div>
        <DropZone onDrop={handleDrop} />
      </div>
      <div>
        {elements.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </div>
    </DndProvider>
  );
};

export default App;
