"use client";

export type Dictionary = {
  word:string,
  phonetic:string,
  sourceUrls:Array<string>,
  meanings:Array<{ partOfSpeech:string, definitions:Array<{ definition:string }>, synonyms:Array<string> }>
  phonetics:Array<{ audio: string }>
}

export type Response<T> = {
  data:T,
  status:number
}

const API_URL = "https://api.dictionaryapi.dev";

export const searchService = async (searchText: string): Promise<Response<Array<Dictionary>>> => {
  return fetch(API_URL + `/api/v2/entries/en/${searchText}`)
    .then(async (response) => {
      return { data: response.ok ? await response.json() : null, status: response.status };
    })
};
