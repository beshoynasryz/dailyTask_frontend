import React from 'react';
import AddTask from '../components/AddTask';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Daily Tasks Report</h1>
      <AddTask />
      {/* <TaskForm /> */}
      {/* <TaskList /> */}
    </div>
  );
};

export default Home;
