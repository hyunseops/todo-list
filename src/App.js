import {v4 as uuid} from "uuid";
import "./App.css";
import { useState } from "react";

// camelcase -> 띄어쓰기가 필요한 곳에 대문자로 표시한다
// ex) background-color -> backgroundColor
//     font-size -> fontSize

function App() {
  // react way
  const [inputValue, setInputValue] = useState("");
  /**
   * 세트메뉴
   * {
   *  id: 중복되지 않는 id값
   *  name: 메뉴 이름
   *  price: 가격
   *  hamburger: 햄버거 종류
   *  isPotato: 감자튀김 받을지 말지
   *  soda: 음료수 종류
   * }
   */
  /**
   * TODO object, 객체
   * {
   *  id: 중복되지 않는 id값,
   *  content: 할일에 대해 적은 내용 string ('할일 1')
   *  createAt: 생성된 시간 number (0~3939393939~)
   *  isDone: 완료 여부 (boolean)
   * }
   * */
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState(
    Array.from({ length: todos.length }, () => false)
  );
  // state 변화하는 값, 임시 값
  // React -> state가 변할때마다 화면을 다시 그린다.
  // ["할일 1", "할일 2"];

  return (
    // JSX (JS -> HTML)
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
        {/* () => {} */}
        <input
          // Input의 제어권을 React(JS)가 가지고 있을 수 있게, state값을 주입했다.
          value={inputValue}
          // Input의 값이 변하는 이벤트가 발생했을 때, 제어권을 가진 React(JS)의 state값을 변경한다.
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // spread 연산자
            
            const newTodo = {
              id: uuid(),
              content: inputValue,
              createdAt: Date.now(),
              isDone: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
          }}
        >
          ADD
        </button>
      </div>
      
      {/* DRY Don't Repeat Yourself */}
      {/* [할일 1, 할일 2]  */}
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.isDone} 
            onChange={(e) => {
            /**
             * todos :
             * { content: "할일 1"
             * createdAt: 16977~
             * id: "2832dfdff~"
             * isDone: false },
             * 두번째 todo,
             * 세번째 todo
             */
              const nextTodos = todos.map((todo, idx) => 
                idx === index ? {...todo, isDone: e.target.checked} : todo
              );
              setTodos(nextTodos);
            }}
          />
          <span style={{ textDecoration: todo.isDone ? "line-through" : ""}}>
            {todo.content}
          </span>
          <button>DEL</button>
        </div>
      ))}
    </div>
  );
}

export default App;