import React from 'react';

const Home = (props) => {
  console.log(1, props);
  const { number, setNumber } = props;
  return (
    <div>
      <h1>홈: {number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        증가
      </button>
    </div>
  );
};

export default Home;
