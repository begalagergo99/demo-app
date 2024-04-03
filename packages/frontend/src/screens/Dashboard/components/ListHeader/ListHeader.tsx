import React from 'react';

const ListHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 mx-48">
      <div className="flex items-center gap-10">
        <p className="mr-2">Status</p>
        <p className="font-medium">Title</p>
      </div>
      <div className="flex items-center gap-10">
        <p className="mr-2">Description</p>
        <p>Duedate</p>
      </div>
      <div></div>
    </div>
  );
};

export default ListHeader;
