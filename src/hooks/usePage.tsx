import { useState, useEffect, useRef } from 'react'

import { searchService, Dictionary } from '../services/dictionary.service';

export type SearchedWord = {
   date: string,
   time: string,
   word: string
}

export const usePage = () => {
   let audioRef = useRef<HTMLAudioElement>(null);
   const [search, setSearch] = useState("");
   const [error, setError] = useState('');
   const [loadingWord, setLoadingWord] = useState(false);
   const [isOpenListWord, setIsOpenListWord] = useState(false);
   const [listDictionary, setListDictionary] = useState<Dictionary[]>([]);
   const [listSearchedWords, setListSearchedWords] = useState<SearchedWord[]>([]);

   useEffect(() => {

      const result = (localStorage.getItem("words") || "[]") as string;
      const parseData = JSON.parse(result) as SearchedWord[];
      setListSearchedWords(parseData);

   }, [])

   const onSubmit = async () => {

      setLoadingWord(true);

      if (search.trim() === '') {
         setError("Debe escribir una palabra");
         setLoadingWord(false);
         return;
      }

      if (error.trim() !== '') {
         setError("");
      }

      const response = await searchService(search);

      if (response.status === 200) {
         setListDictionary(response.data);
      }

      if (response.status === 404) {
         setListDictionary([{ word: "No se encontro la palabra", phonetic:'', sourceUrls:[], meanings:[], phonetics: [] }]);
         setLoadingWord(false);
         return;
      }

      let cloneArray = structuredClone(listSearchedWords);

      const objDate = new Date()
      const stringTime = objDate.toLocaleTimeString();
      const stringDate = objDate.toLocaleDateString();

      cloneArray.push({ date: stringDate, time: stringTime, word: search });

      localStorage.setItem("words", JSON.stringify(cloneArray));

      setListSearchedWords(cloneArray);

      setLoadingWord(false);
   }
  
   const toggleListWords = () => {
      setIsOpenListWord(!isOpenListWord);
   }


   const playAudio = async (audioUrl: string) => {
      
      let audio = audioRef.current;
      
      if(!audio) return;
      
      audio.setAttribute('src', audioUrl);

      audio.load();
      
      await audio.play();

   };

   return {
      search,
      setSearch,
      loadingWord,
      listDictionary,
      listSearchedWords,
      isOpenListWord,
      error,
      playAudio,
      toggleListWords,
      onSubmit,
      audioRef
   }
}