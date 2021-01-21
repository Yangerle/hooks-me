

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

// import Promise from './promise'

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

const TestTimes0 = React.memo(({changeNumber0})=>{
    console.log('TestTimes0子：我渲染了');
    return (
        <>
            <button onClick={changeNumber0}>重设数字0</button>
        </>
    )
})
const TestTimes1 = React.memo(({changeNumber1})=>{
    console.log('TestTimes1子：我渲染了');
    return (
        <>
            <button onClick={changeNumber1}>重设数字1</button>
        </>
    )
})
/*
* 测试宏任务与微任务
* Promise原生的实现和系统提供的微任务接口有关（如nextTick）。
* 本地可以使用setTimeout来实现，不过调用顺序和原生的微任务是不一样的，因为其实现方式是宏任务。
* */
const promise = ()=>{
    console.log('马上执行for循环啦');
    setTimeout(function(){
        console.log('定时器开始啦1')
    });
}

const Hah = ()=>{

    const handleClick = ()=>{
        setTimeout(function(){
            console.log('定时器开始啦0')
        });

        // promise()

        new Promise(function(resolve){
            console.log('马上执行for循环啦');
            for(var i = 0; i < 10000; i++){
                i === 99 && resolve();
            }
        }).then(function(){
            console.log('执行then函数啦')
        });

        console.log('代码执行结束');
    }
    return (
        <>
            <button onClick={handleClick}>执行测试任务</button>
        </>
    )
}

const App = ()=>{
    const [number0,setNumber0] = useState(0);
    const [number1,setNumber1] = useState(1);
    const changeNumber0 = ()=>{
        setNumber0(number0+1)
        console.log(number0)
        setNumber0(number0+1)
        console.log(number0)
        setNumber0(number0+1)
        console.log(number0)

        // 宏任务中
        // setTimeout(()=>{
        //     console.log('执行setTimeout')
        //     setNumber0(number0+1)
        //     console.log(number0)
        //     setNumber0(number0+1)
        //     console.log(number0)
        //     setNumber0(number0+1)
        //     console.log(number0)
        // })
        //

        // 微任务中（fetch由promise实现）
        // fetch('http://192.168.20.146:3000/mock/551/auth/global/wrongtopic/appeal.htm')
        //     .then(response=>response.json())
        //     .then(function(myJson) {
        //         console.log('执行ajax')
        //         setNumber0(number0+1)
        //         console.log(number0)
        //         setNumber0(number0+1)
        //         console.log(number0)
        //         setNumber0(number0+1)
        //         console.log(number0)
        //     });

    };
    const changeNumber0UCB = useCallback(()=>{
        setNumber0(number0+1)
        console.log(number0)
        setNumber0(number0+1)
        console.log(number0)
        setNumber0(number0+1)
        console.log(number0)

        // setTimeout(()=>{
        //     console.log('执行setTimeout')
        //     setNumber0(number0+1)
        //     console.log(number0)
        //     setNumber0(number0+1)
        //     console.log(number0)
        //     setNumber0(number0+1)
        //     console.log(number0)
        // })
        //
        // fetch('http://192.168.20.146:3000/mock/551/auth/global/wrongtopic/appeal.htm')
        //     .then(response=>response.json())
        //     .then(function(myJson) {
        //         console.log('执行ajax')
        //         setNumber0(number0+1)
        //         console.log(number0)
        //         setNumber0(number0+1)
        //         console.log(number0)
        //         setNumber0(number0+1)
        //         console.log(number0)
        //     });
    },[number0])
    const changeNumber1 = ()=>{
        setNumber1(number1+1)
    }
    const changeNumber1UCB = useCallback(()=>{
        setNumber1(number1+1)
    },[number1])
    console.log('父：我渲染了');
    return (
        <>
            {number0}
            <br/>
            {number1}
            <br/>
            <TestTimes0 changeNumber0={changeNumber0}/>
            <TestTimes1 changeNumber1={changeNumber1UCB}/>
            <br/>
            <Hah/>
        </>
    )
}

export default App;
