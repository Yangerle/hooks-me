
import React, {
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
    useLayoutEffect,
    useReducer,
    forwardRef,
    useImperativeHandle,
    useDebugValue
} from 'react'

/*
TypeScript 中提升幸福感的 10 个高级技巧
via-https://juejin.cn/post/6919478002925453320
*/

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
}

const a = {
    foo: { bar: 22 },
    baz: { hah: 'yang'}

}
const b = a as DeepReadonly<typeof a>
b.foo.bar = 33
b.baz.hah = 22

interface SetPoint {
    (x:number, y: number): void;
}

// type SetPoint = (x: number, y?: number)=>void;

const setPoint: SetPoint = (x, y)=>{

}

function setPoint1 (x: number, y: number): void{

}


const Ts = ()=>{
    return (
        <>
            <div>你好</div>
        </>
    )
}

export default Ts