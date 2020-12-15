

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

const Themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

const ThemeContext = React.createContext(Themes);

function App() {
    const [themes,setThemes] = useState(Themes)
    const handleClick = ()=>{
        setThemes((prethemes)=>{
            return {
                ...prethemes,
                red: {
                    foreground: "#ffffff",
                    background: "red"
                }
            }
        })
    }
    return (
        <ThemeContext.Provider value={themes}>
            <Toolbar />
            <button onClick={handleClick}>
                改变context的value
            </button>
        </ThemeContext.Provider>
    );
}

function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const themes = useContext(ThemeContext);
    const light = themes.light
    // return (
    //     <button style={{ background: light.background, color: light.foreground }}>
    //         {console.log('render')}
    //         {console.log(themes,'themes')}
    //         I am styled by theme context!
    //     </button>
    // );
    console.log(themes,'themes')
    //通过useMemo的监听及缓存使context在局部改变时，不再重新渲染使用useContext的组件。
    //这对于高开销组件的缓存很有用
    //memo只会对props做潜比较，所以在使用useContext的组件中，即使组件使用了memo，当context局部改变时，也会重新渲染组件。
    return useMemo(()=>(
        <button style={{ background: light.background, color: light.foreground }}>
            {console.log('render')}
            I am styled by theme context!
        </button>
    ),[light])
}

export default App;
