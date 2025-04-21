"use client"
import React from 'react'

import { SearchInput } from '../Search/SearchInput';
import { ButtonPlay } from '../Button/ButtonPlay';

//hook
import { usePage } from '../../hooks/usePage';

export const MainComponent = () => {

   const { search, setSearch, listDictionary, listSearchedWords, isOpenListWord, error, onSubmit, playAudio, toggleListWords, audioRef } = usePage();

   return (
      <>
         <main className="max-w-screen-md flex flex-col gap-8 justify-center items-center mx-auto p-4">

            <SearchInput textValue={search}
               search={onSubmit}
               onChange={(e) => setSearch(e.target.value)}
            />

            {listDictionary.length > 0 ? listDictionary.map((item, keyValueItem) => ((
               <section className='w-full' key={keyValueItem}>
                  <div className='flex w-full items-center justify-between'>
                     <div>
                        <p className='font-bold text-3xl'>{item.word}</p>
                        <p className='dark:text-purple-500 pt-1'>{item.phonetic}</p>
                     </div>
                     <div className='flex gap-1'>
                        {item.phonetics.map((phonetic, keyValue) => {
                           return (
                              phonetic.audio !== '' ?
                                 <div key={keyValue}>
                                    <ButtonPlay onClick={() => playAudio(phonetic.audio)} />
                                 </div> : null
                           )
                        })}
                     </div>
                  </div>

                  <div className='pt-3'>
                     {item.meanings.length === 0 ? null : item.meanings.map((mean, meanKey) => {
                        return (
                           <div key={meanKey}>
                              <div className='flex gap-4 items-center pt-4'>
                                 <p className='font-semibold text-md'>
                                    {mean.partOfSpeech}
                                 </p>
                                 <hr className='border-gray-200 w-full' />
                              </div>

                              <p className='pt-3 text-gray-500'>{Object.keys(item).find(x => x === "meanings")?.replace(/\b\w/g, l => l.toUpperCase())}</p>
                              <ul className='list-disc pl-8 pt-4 pb-3'>
                                 {mean.definitions.map((t, keyDef) => (

                                    <li className='text-gray-500 p-1' key={keyDef}>{t.definition}</li>

                                 ))}
                              </ul>

                              {mean.synonyms.length === 0 ? null :
                                 <div className='flex gap-3 items-center'>

                                    <p className='text-gray-500'>{Object.keys(mean).find(x => x === "synonyms")?.replace(/\b\w/g, l => l.toUpperCase())}</p>

                                    <p className='font-semibold text-sx text-purple-500'>
                                       {mean.synonyms.join(" ")}
                                    </p>

                                 </div>
                              }

                           </div>
                        )
                     })}
                  </div>

                  {
                     item.sourceUrls.length === 0 ? null :

                        <div className='pt-4'>

                           <hr className='text-gray-200' />

                           <div className='flex flex-wrap gap-1.5 pt-4'>
                              <p className='text-gray-500'>
                                 Source
                              </p>
                              <div className='flex'>
                                 <a className='border-b text-gray-500' href={item.sourceUrls.join("")}>{item.sourceUrls.join("")}
                                 </a>
                                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
                              </div>
                           </div>

                        </div>
                  }
               </section>
            ))) : null}

          { listSearchedWords.length === 0 ? null : <button className='cursor-pointer' onClick={toggleListWords}>
              { !isOpenListWord ? 
                 "Most searched words"
               : "Close"
              }
            </button> }

            {isOpenListWord ? <div className="w-full transition-all duration-300">

               <div className="w-full max-h-52 overflow-auto">

                  {listSearchedWords.map((item, keyValue) => (
                     <div key={item.word + keyValue} className="flex items-center p-4 border-b border-gray-200 item justify-between">
                        <div className="text-sm font-medium  flex gap-2">
                           <p className="font-bold">{item.word}</p>
                           <p>{item.date}</p>
                           <p>{item.time}</p>
                        </div>
                     </div>
                  ))
                  }
               </div> </div> : null}

            {error && (
               <div className="text-red-500 text-sm mt-1">{error}</div>
            )}

         </main>

         <audio id="myAudio" ref={audioRef} />
      </>
   )
}
