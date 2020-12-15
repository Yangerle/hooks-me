

import React, {
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
    useLayoutEffect,
    useReducer
} from 'react'

const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'add2':
            return {count: state.count + 2}
        default:
            throw new Error();
    }
}

const init = state=>({count: 5})

function Counter() {
    //适用场景：1. state 逻辑较复杂且包含多个子值，2.下一个 state 依赖于之前的 state，3.使用 useReducer 还能给那些会触发深更新的组件做性能优化
    //你可以向子组件传递 dispatch 而不是回调函数
    const [state, dispatch] = useReducer(reducer, {count: 0}, init);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'add2'})}>+</button>
        </>
    );
}

export default Counter;
