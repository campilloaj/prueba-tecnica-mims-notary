import { PlayIcon } from '../Icons/PlayIcon';

export const ButtonPlay = ({onClick = () => {}}) => {

   return (
      <button type="button" onClick={onClick} className="bg-purple-200 hover:bg-purple-300 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-purple-300 dark:hover:bg-purple-400 dark:focus:ring-purple-400">
        <PlayIcon/>
      </button>
   )
}