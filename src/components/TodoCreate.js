import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    // open시 45도 회전하면서 배경 변경
    ${(props) =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            &:active {
                background: #fa5252;
            }
            transform: translate(-50%, 50%) rotate(45deg);
        `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate() {
    // +,x 버튼 상태 관리
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    // open button 토글
    const onToggle = () => setOpen(!open);
    // 값이 변경될 경우 값 변경
    const onChange = (e) => setValue(e.target.value);
    // format의 기본 기능 제거
    const onSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지
        dispatch({
            type: "CREATE",
            todo: {
                id: nextId.current,
                text: value,
                done: false,
            },
        });
        // 등록후 값 초기화
        setValue("");
        // modal open한거 false로 변경
        setOpen(false);
        nextId.current += 1;
    };
    return (
        <>
            {/* open 시 입력 창 보이도록 하기 */}
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input autoFocus placeholder="할 일을 입력 후, Enter 를 누르세요" onChange={onChange} value={value} />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}
// TodoContext 에서 관리하고 있는 state 가 바뀔 때 때 TodoCreate 의 불필요한 리렌더링을 방지
export default React.memo(TodoCreate);
