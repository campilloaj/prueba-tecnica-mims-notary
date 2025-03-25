
/*import Link from 'next/link'; 
<li>
<Link href={"/dashboard"}>Dashboard</Link>
</li>*/

//components
import { Navbar } from './components/Navbar/Navbar';
import { MainComponent } from './components/Main/MainComponent';

export default function Home() {
 
  return (
    <div>
      <Navbar/>
      <MainComponent/>
    </div>
  );
}


