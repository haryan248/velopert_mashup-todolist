import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    // 마우스를 올렸을 때 remove 버튼 표시
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    // 완료한 checkCircle border 적용
    ${(props) =>
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    // 완료한 text의 경우 색깔 변경
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
        `}
`;

function TodoItem({ id, done, text }) {
    return (
        <TodoItemBlock>
            {/* 완료한 항목의 경우 체크 표시 */}
            <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default TodoItem;
