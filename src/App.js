

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

/**
 * TS环境置入：npm install --save typescript @types/node @types/react @types/react-dom @types/jest
 * via-https://juejin.cn/post/6844903911396999182
 */

const App = ()=>{

    return (
        <>
            <div>置入TS环境后再创建ts及tsx文件，不然gitlens好像不识别</div>
        </>
    )

}

export default App;
