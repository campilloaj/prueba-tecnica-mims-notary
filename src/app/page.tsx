
import Link from 'next/link'; 
//components
import { Navbar } from './components/Navbar/Navbar';
import { MainComponent } from './components/Main/MainComponent';

export default function Home() {
 
  return (
    <div>
      <Navbar/>
      <MainComponent/>
      <li>
        <Link href={"/dashboard"}>Dashboard</Link>
      </li>
    </div>
  );
}


