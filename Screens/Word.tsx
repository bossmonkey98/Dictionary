import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { useWordData } from '../context/WordContext'
import { s } from 'react-native-wind'
import { useTheme } from '../context/themeContext'


const Word = () => {
  const { wordData } = useWordData()
  const {theme} = useTheme()
  
  return (
    <ScrollView style={s`${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <View style={s`m-4 p-2 border ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
        <Text style={s`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{wordData[0].word.toUpperCase()}</Text>
        <Text style={s`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Pronunciation: {wordData[0]?.phonetic} </Text>
      </View>
      {wordData.map((i: any) =>
         <View key ={i.id} style={s`p-2 m-4 border ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
          {i?.meanings.map((meaning:any) =>
          <View key = {meaning.id}>
          <Text style={s`text-xl font-medium mt-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{meaning.partOfSpeech.toUpperCase()}</Text>
          {meaning?.definitions.map(({definition}:any)=><Text key={definition.id} style={s`mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{definition}</Text>)}
          </View>
          )}
           </View>
      )}
      </ScrollView>
  )
}

export default Word