import React, { useRef, useReducer, createContext, useContext } from "react";

// 초기 할일 리스트
const initialTodos = [
    {
        id: 1,
        text: "프로젝트 생성하기",
        done: true,
    },
    {
        id: 2,
        text: "컴포넌트 스타일링하기",
        done: true,
    },
    {
        id: 3,
        text: "Context 만들기",
        done: false,
    },
    {
        id: 4,
        text: "기능 구현하기",
        done: false,
    },
];

// reducer 만들기
function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return state.concat(action.todo);
        case "TOGGLE":
            // action된 id 와 같은것만 보이도록 설정
            return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
        case "REMOVE":
            // 제거할 id와 같지 않은것만 설정
            return state.filter((todo) => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// 커스텀 Hook 만들어 주기

// state 를 사용하기 위해 export
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

// dispatch를 사용하기 위해 export
export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}
