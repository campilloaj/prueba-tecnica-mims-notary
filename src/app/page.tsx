"use client"

//components
import { Navbar } from './components/Navbar/Navbar';
import { DarkModeIcon } from './components/Icons/DarkModeIcon';
import { LightModeIcon } from './components/Icons/LightModeIcon';
import { HistoryIcon } from './components/Icons/HistoryIcon';
import { CloseIcon } from './components/Icons/CloseIcon';

//hook
import { usePage } from './usePage';

export default function Home() {

  const { search, setSearch, listDictionary, listSearchedWords, isOpenListWord, font, selectFont, error, onSubmit, playAudio, theme, toggleListWords, toggleTheme } = usePage();

  return (
    <div className={`${font} ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Navbar selectFont={selectFont} theme={theme}>
        <div className="relative inline-block text-left">
          <button
            onClick={() => toggleTheme(theme !== 'dark' ? 'dark' : 'light')}
            className="flex items-center px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            {theme === 'dark' ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </button>

        </div>
      </Navbar>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-8 sm:p-10">

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

          {isOpenListWord ? <div className="w-full transition-all duration-300"> <h3 className="text-center pb-3">Palabras buscadas</h3>

            <div className="w-full max-h-52 overflow-auto">

              {listSearchedWords.map((item, keyValue) => (
                <div key={item.word + keyValue} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-black justify-between">
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

          <div className="flex gap-2 items-center flex-col sm:flex-row flex-wrap sm:justify-center ">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

            <div className='flex gap-1 sm:items-center sm:justify-center'>
              <button
                onClick={onSubmit}
                className="rounded-full border border-solid transition-colors flex items-center justify-center  bg-blue-500 text-white hover:bg-blue-600 hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32 cursor-pointer "
              >
                Buscar
              </button>

              <button
                title="Palabras buscadas"
                onClick={toggleListWords}
                className="rounded-full border border-solid transition-colors flex items-center justify-center  bg-blue-500 text-white hover:bg-blue-600 hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-2 sm:px-4 sm:min-w-24 cursor-pointer max-w-6"
              >
                {isOpenListWord ? <CloseIcon /> : <HistoryIcon />}

              </button>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg shadow-lg borde">

            {listDictionary.length > 0 ? listDictionary.map((item, keyValueItem) => ((
              <div key={item.word + keyValueItem} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 justify-between">
                <div className="text-sm font-medium text-gray-700">{item.word}</div>
                <div className="flex gap-1">
                  {item.phonetics.map((phonetic, keyValue) => {
                    return (
                      phonetic.audio !== '' ?
                        <div className="flex flex-col" key={keyValue}>
                          <button
                            onClick={() => playAudio(phonetic.audio)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-16"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 10V4l-7 4v8l7 4V14a4 4 0 1 1 4 4h1V9h-1a4 4 0 0 1-4 4z"
                              />
                            </svg>
                          </button>
                        </div> : null)
                  }
                  )}
                </div>

              </div>
            ))) : null}


          </div>

        </main>
      </div>
        <audio id="myAudio" />
    </div>
  );
}


