

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
* 列出渲染次数多的原因：
*   1. 回调中有异步操作（减少回调中的异步操作）。
*   2. 传递给子组件的props在父组件渲染时被重新定义（使用useCallback、useMemo配合React.memo来减少子组件的渲染）。
* 使用useCallback时：
*   1. 当作为props传递给子组件时，配合React.memo用于减少子组件的渲染次数。
*   2. 在当前组件中只是减少了重新定义的次数，重新定义的性能损耗其实可以忽略。
*   3. 可通过setState回调函数，来减少依赖项，从而减少props被重新定义的次数。
* 使用useMemo时：
*   1. 其实只是提供了someRef.current的快捷使用方式，缓存了变量的索引。
*   2. 在当前组件使用时，用于缓存通过较大计算量得到的值。
*   3. 当作为props传递给子组件时，配合React.memo用于减少子组件的渲染次数。
* */


const Child = ({handleClick})=>{
    console.log('child: 我渲染了')

    return (
        <button onClick={handleClick}>点击我</button>
    )
}
const App = ()=>{
    const [num,setNum] = useState(0)

    const handleClick = ()=>{

        setNum(num + 1)
        setNum(num + 1)
        setNum(num + 1)
        console.log('num',num)

        // setTimeout(()=>{
        //     console.log(num)
        //     setNum((a)=>{
        //         console.log(a)
        //         return a + 1
        //     })
        // })

        // 排除setTimeout影响，研究闭包的形成
        ;(()=>{
            console.log(num)
            setNum((a)=>{
                console.log(a)
                return a + 1
            })
        })()
    }
    console.log('父：渲染了')
    return (
        <>
            {num}
            <br/>
            <Child handleClick={handleClick}/>
        </>
    )

}

export default App;
