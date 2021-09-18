# velopert_mashup-todolist

## 2021.09.18

### 사용 라이브러리

react-icons, styled-components

[멋진 투두 리스트 만들기](https://react.vlpt.us/mashup-todolist/01-create-components.html)

-   벨로퍼트와 함께 투두리스트 만들기

## 1. 컴포넌트 구성

-   TodoTemplate
    이 컴포넌트는 우리가 만들 투두리스트의 레이아웃을 설정하는 컴포넌트입니다. 페이지의 중앙에 그림자가 적용된 흰색 박스를 보여줍니다.

-   TodoHead
    이 컴포넌트는 오늘의 날짜와 요일을 보여주고, 앞으로 해야 할 일이 몇개 남았는지 보여줍니다.

-   TodoList
    이 컴포넌트는 할 일에 대한 정보가 들어있는 todos 배열을 내장함수 map 을 사용하여 여러개의 TodoItem 컴포넌트를 렌더링해줍니다.

-   TodoItem
    각 할 일에 대한 정보를 렌더링해주는 컴포넌트입니다. 좌측에 있는 원을 누르면 할 일의 완료 여부를 toggle 할 수 있습니다. 할 일이 완료됐을 땐 좌측에 체크가 나타나고 텍스트의 색상이 연해집니다. 그리고, 마우스를 올리면 휴지통 아이콘이 나타나고 이를 누르면 항목이 삭제됩니다.

-   TodoCreate
    새로운 할 일을 등록할 수 있게 해주는 컴포넌트입니다. TodoTemplate 의 하단부에 초록색 원 버튼을 렌더링해주고, 이를 클릭하면 할 일을 입력 할 수 있는 폼이 나타납니다. 버튼을 다시 누르면 폼이 사라집니다.

## 2. Context API를 활용한 상태 관리하기

Context 가 지니고 있는 state를 한곳에서 관리함으로써 편리하게 함

### - useTodoState

    state 값 가져오기 위한 커스텀 Hooks

### - useTodoDispatch

    dispatch 사용하기 위한 커스텀 Hooks

### - useTodoNextId

    nextId 가 의미하는 값은 새로운 항목을 추가 할 때 사용 할 고유 ID

사용 예)
import { useTodoState } from '../TodoContext';
...
const todos = useTodoState();

```
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
```

TodoProvider 로 감싸져있지 않다면 에러를 발생
