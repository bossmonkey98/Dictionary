import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../context/themeContext'
import { s } from 'react-native-wind'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { ScreenParamList } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useWordData } from '../context/WordContext'

const Home = () => {
    const { theme } = useTheme()
    const { setWordData, wordData } = useWordData()
    const RandomWordUrl: string = 'https://random-words-api.vercel.app/word'
    const [word, setWord] = React.useState<string>('')
    const [inputData, setInputData] = React.useState<any>()
    const [firstWord, setFirstWord] = React.useState<boolean>(true)
    const dictionaryUrl: string = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamList, 'Home'>>()

    const fetchWord = async () => {
        try {
            const { data } = await axios.get(RandomWordUrl)
            setWord(await data[0]?.word)
        } catch (err) {
            console.warn(err)
        }
    }

    const fetchData = async () => {
        try {
            const res = await axios.get(dictionaryUrl)
            setWordData(res?.data)
        } catch (err) {
            if(firstWord === true)fetchWord()
            else alert('Word not found')
        }
    }
    useEffect(() => {
        if (firstWord && word === '') fetchWord()
        else fetchData()
    }, [word])
    return (
        wordData &&
        <ScrollView style={s`h-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <View style={s`mt-2 m-1 flex-row items-center`}>
                <TextInput placeholder='Enter text here' style={s`m-1 p-1 text-lg w-4/5 h-10 border bg-white`} 
                onChangeText={(text) => setInputData(text)} />
                <TouchableOpacity style={s`m-1 border p-1 ${theme === 'dark' ? 'border-white' : 'border-black'}`} onPress={() => {
                    if (inputData) {
                        setFirstWord(false)
                        setWord(inputData)
                    }
                }
                }>
                    <Text style ={s` ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Search</Text>
                </TouchableOpacity>
            </View>
            {firstWord ?
                <TouchableOpacity style={s`m-4 p-2 border ${theme === 'dark' ? 'border-white' : 'border-black'}`}
                    onPress={() => {
                        navigator.navigate('Word')
                    }}>
                    <Text style={s`text-xl font-medium text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Word Of The Day</Text>
                    <Text style={s` m-1 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`} ><Text style={s`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{wordData[0]?.word.toUpperCase()}</Text>: {wordData[0]?.meanings[0]?.definitions[0]?.definition}</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    onPress={() => {
                        navigator.navigate('Word')
                    }}>
                    {wordData[0]?.meanings[0]?.definitions.map((i: any) => 
                    <View key={i.id} style={s`m-4 p-2 border ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
                        <Text style={s`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{wordData[0]?.word.toUpperCase()}</Text>
                        <Text style={s`m-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`} >{i?.definition}</Text>
                    </View>)}
                </TouchableOpacity>}
        </ScrollView>
    )
}

export default Home