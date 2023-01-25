import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import HomePage from './pages/HomePage.js';
import Sub from './Sub.js';

// 0. React 엔진 - 데이터변경감지해서 UI그려주는 엔진 Virtual Dom
// 1. 실행과정(index.html) - SPA(싱글 페이지 어플리케이션) single page application
// 2. JSX문법 - 리액트 문법 https://ko.reactjs.org/
// 3. 바벨 - (자바스크립트 ES5, ES6) https://babeljs.io/
// 4. 웹팩 - https://webpack.js.org/

// (1) return시에 하나의 DOM만 리턴할 수 있다.
// (2) 변수선언은 let(변수) 혹은 const(상수)로만 해야함. var 사용 지양
// (3) if사용 불가능 -> 삼항연산자 사용 가능(조건 ? 값(true) : 값(false))
// (4) 조건부 렌더링 (조건 && 값(true))
// (5) css디자인
//     - 내부에 적는 방법
//     - 외부 파일에 적는 방법
//     - 라이브러리 사용
//         · (부트스트랩, component-styled)
//         · https://react-bootstrap.github.io/
//         · https://styled-components.com/
//         · https://itchallenger.tistory.com/569

let a = 10; // 변수
const b = 20; // 상수

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function App() {
  console.log('App() 실행됨');
  let c;
  let d = undefined;
  // console.log(1, c);

  const mystyle = {
    color: 'red',
  };

  let list = [1, 2, 3];

  // let number = 1; // 상태값이 아님
  const [number, setNumber] = useState(2); // React안에 hooks 라이브러리 상태값이 됨.

  const add = () => {
    // number++;
    setNumber(number + 1); // 리액트한테 number 값 변경할께 라고 요청
    console.log('add', number);
  };

  let sample = [
    { id: 1, name: '박경희' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: '우주최강미녀' },
    { id: 4, name: '세젤녀' },
  ];

  const [users, setUsers] = useState(sample); // 레퍼런스 변경되야 동작함!!

  const download = () => {
    // fetch().then().then();
    setUsers([...sample, { id: 5, name: '못난이' }]);
  };

  const [data, setData] = useState(0);

  const download2 = () => {
    // 다운로드 받고 (통신)
    let downloadData = 5;
    setData(downloadData);
  };

  // 실행시점
  // (1) App() 함수가 최초 실행될 때(마운트될 때)
  // (2) 상태(state) 변수가 변경될때 (dependencyList에 등록되어있는 변수가 변경되었을때)
  useEffect(() => {
    console.log('useEffect() 실행됨');
    download2();
  }, []);

  // useMemo => 메모라이제이션(기억)
  const [list2, setList2] = useState([1, 2, 3, 4]);
  const [str, setStr] = useState('합계:');

  const getAddResult = () => {
    let sum = 0;
    list2.forEach((i) => (sum = sum + i));
    console.log('sum 함수 실행됨:', sum);
    return sum;
  };

  const addResult = useMemo(() => getAddResult(), [list2]);

  // useRef (디자인)
  // dom을 변경할 때 사용

  const myRef = useRef(null);

  const [list3, setList3] = useState([
    { id: 1, name: '경희' },
    { id: 2, name: '은준' },
  ]);

  const myRefs = Array.from({ length: list3.length }).map(() => createRef());

  // 렌더링(rendering) 시점 = 상태값 변경
  return (
    <div>
      <HomePage />
      <div>
        <Title>이진규</Title>
      </div>
      <button
        onClick={() => {
          console.log(myRef);
          console.log(myRef.current);
          myRef.current.style.backgroundColor = 'red';

          myRefs[1].current.style.backgroundColor = 'blue';
        }}
      >
        색 변경
      </button>
      <div ref={myRef}>박스</div>
      {list3.map((user, index) => (
        <h1 key={user.id} ref={myRefs[index]}>
          {user.name}
        </h1>
      ))}

      <div style={mystyle}>
        안녕{a === 10 ? '"10"이 맞습니다.' : '"10"이 아닙니다.'}
      </div>
      <h1 className="box-style">해딩태그{b === 20 && '"20"이 맞습니다.'}</h1>
      <hr />
      <div>{list[0]}</div>
      <div>
        {list.map((n) => (
          <h1 key={n}>{n}</h1>
        ))}
      </div>
      <h1>숫자:{number}</h1>
      <button onClick={add}>더하기</button>
      <Sub />
      <button onClick={download}>다운로드</button>
      {users.map((u) => (
        <h1 key={u.id}>
          {u.id}. {u.name}
        </h1>
      ))}
      <h1>데이터:{data}</h1>
      <button
        onClick={() => {
          setData(data + 1);
        }}
      >
        더하기
      </button>

      <button
        onClick={() => {
          setStr('안녕');
        }}
      >
        문자 변경
      </button>
      <button
        onClick={() => {
          setList2([...list2, 10]);
        }}
      >
        리스트값 추가
      </button>
      <div>
        {list2.map((i) => (
          <h1 key={i}>{i}</h1>
        ))}
      </div>
      <div>
        {str} {addResult}
      </div>
    </div>
  );
}

export default App;
