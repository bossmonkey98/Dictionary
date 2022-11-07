import React, { createContext, useContext } from 'react'
import { Props } from './themeContext'

const WordContext = createContext<any>('')

const useWordData = () => useContext(WordContext)


const WordProvider: React.FC<Props> = ({ children }) => {
    const [wordData , setWordData] = React.useState<any>()
    return (
        <WordContext.Provider value={{wordData , setWordData}}>
            {children}
        </WordContext.Provider>
    )
}

export {WordProvider , useWordData}