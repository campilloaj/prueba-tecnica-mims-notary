import { useState, useEffect } from 'react'
import { Poppins, Roboto_Mono, Merriweather } from "next/font/google";

import { searchService, Dictionary } from './services/dictionary.service';

const robotoMono = Roboto_Mono({
   subsets: ['latin'],
   weight: '400',
});

//sans serif
const poppins = Poppins({
   subsets: ['latin'],
   weight: '400',
});

//serif
const merriweather = Merriweather({
   subsets: ['latin'],
   weight: '400',
});

export type SearchedWord = {
   date: string,
   time: string,
   word: string
}

export const usePage = () => {

   const [font, setFont] = useState(merriweather.className)
   const [search, setSearch] = useState("");
   const [theme, setTheme] = useState('dark')
   const [error, setError] = useState('');
   const [isOpenListWord, setIsOpenListWord] = useState(false);
   const [listDictionary, setListDictionary] = useState<Dictionary[]>([]);
   const [listSearchedWords, setListSearchedWords] = useState<SearchedWord[]>([]);

   useEffect(() => {

      const result = (localStorage.getItem("words") || "[]") as string;
      const parseData = JSON.parse(result) as SearchedWord[];
      setListSearchedWords(parseData)

   }, [])

   const onSubmit = async () => {

      if (search.trim() === '') {
         setError("Debe escribir una palabra");
         return;
      }

      if (error.trim() !== '') {
         setError("");
      }

      const response = await searchService(search, "en");

      if (response.status === 200) {
         setListDictionary(response.data);
      }

      if (response.status === 404) {
         setListDictionary([{ word: "No se encontro la palabra", phonetics: [] }]);
         return;
      }

      let cloneArray = structuredClone(listSearchedWords);

      const objDate = new Date()
      const stringTime = objDate.toLocaleTimeString();
      const stringDate = objDate.toLocaleDateString();

      cloneArray.push({ date: stringDate, time: stringTime, word: search });

      localStorage.setItem("words", JSON.stringify(cloneArray));

      setListSearchedWords(cloneArray);

   }

   const selectFont = (option: string) => {

      if (option === "sans_serif") {
         setFont(poppins.className)
      } else if (option === "monospace") {
         setFont(robotoMono.className)
      } else {
         setFont(merriweather.className)
      }

   }


   const toggleListWords = () => {
      setIsOpenListWord(!isOpenListWord)
   }


   const toggleTheme = (option: string) => {
      setTheme(option)
   }

   const playAudio = async (audioUrl: string) => {
      
      let audio = document.getElementById('myAudio') as HTMLAudioElement;
      
      if(!audio) return;
      
      audio.setAttribute('src', audioUrl)

      audio.load();
      
      await audio.play() // Reproduce el audio

   };

   return {
      search,
      setSearch,
      listDictionary,
      listSearchedWords,
      isOpenListWord,
      font,
      selectFont,
      error,
      playAudio,
      toggleTheme,
      toggleListWords,
      theme,
      onSubmit
   }
}