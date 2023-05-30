// Drag & Drop Interfaces
// only TS feature; any code can be inside; it is not available outside of this file
// export keyword allow code to be exported outside of namespace
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
