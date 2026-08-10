import Link from "next/link";


export default function Header(){


return (

<header className="header">


<Link href="/" className="logo">

NOV<span>A</span>

</Link>



<nav className="nav">


<Link href="/">
Accueil
</Link>


<Link href="/services">
Services
</Link>


<Link href="/realisations">
Réalisations
</Link>


<Link href="/a-propos">
À propos
</Link>


<Link href="/contact">
Contact
</Link>


</nav>



<Link
href="/contact"
className="header-button"
>
Demander un devis
</Link>


</header>

);


}