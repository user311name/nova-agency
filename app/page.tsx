import Image from "next/image";
import Link from "next/link";
import "./page.css";


const projets = [
  {
    titre:"NOIR BARBER",
    categorie:"Barber",
    image:"/projets/barber-home.png",
    lien:"/realisations/noir-barber"
  },
  {
    titre:"STORM",
    categorie:"Sport Lifestyle",
    image:"/projets/storm-1.png",
    lien:"/realisations/storm"
  },
  {
    titre:"L'ATELIER",
    categorie:"Restaurant",
    image:"/projets/atelier.png",
    lien:"#"
  },
  {
    titre:"CLÉMENT D.",
    categorie:"Coach",
    image:"/projets/clement.png",
    lien:"#"
  }
];


const services=[
{
titre:"Création de sites web",
texte:"Des sites modernes, rapides et adaptés à votre activité."
},
{
titre:"Refonte de site",
texte:"Donnez une nouvelle image premium à votre entreprise."
},
{
titre:"Optimisation mobile",
texte:"Une expérience parfaite sur téléphone et ordinateur."
},
{
titre:"SEO & Performance",
texte:"Un site rapide pensé pour Google."
}
];


const accompagnement=[
{
titre:"Identité digitale",
texte:"Logo, couleurs et direction artistique."
},
{
titre:"Réseaux sociaux",
texte:"Création de pages et stratégie de lancement."
},
{
titre:"Création de contenu",
texte:"Images et contenus professionnels."
},
{
titre:"Développement commercial",
texte:"Transformer les visiteurs en clients."
}
];



export default function Home(){


return (

<main className="nova-home">


<section className="nova-hero">


<div className="hero-content">


<p className="badge">
● AGENCE DIGITALE PREMIUM
</p>


<h1>
Votre activité mérite
<br/>
une meilleure
<br/>
<span>
présence en ligne.
</span>
</h1>


<p className="hero-text">
Nous créons des sites modernes, rapides et élégants pensés pour transformer vos visiteurs en clients.
</p>



<div className="hero-buttons">

<Link href="/realisations">
Découvrir nos créations →
</Link>


<Link href="/contact">
Demander un devis →
</Link>

</div>


</div>


</section>





<section className="section">


<span>
NOS RÉALISATIONS
</span>


<h2>
Des projets pensés
<br/>
pour des entreprises ambitieuses.
</h2>



<div className="cards">


{
projets.map((p,i)=>(

<div className="card" key={i}>


<Image
src={p.image}
alt={p.titre}
width={600}
height={350}
/>


<h3>
{p.titre}
</h3>


<p>
{p.categorie}
</p>


<Link href={p.lien}>
Voir le projet →
</Link>


</div>

))
}


</div>


</section>







<section className="section">


<span>
NOS SERVICES
</span>


<h2>
Des solutions digitales
<br/>
pensées pour votre réussite.
</h2>



<div className="cards">


{
services.map((s,i)=>(

<div className="box" key={i}>

<h3>
{s.titre}
</h3>

<p>
{s.texte}
</p>

</div>

))
}


</div>


</section>







<section className="section">


<span>
ACCOMPAGNEMENT
</span>


<h2>
On lance votre présence digitale.
</h2>



<div className="cards">


{
accompagnement.map((a,i)=>(

<div className="box" key={i}>

<h3>
{a.titre}
</h3>

<p>
{a.texte}
</p>

</div>

))
}


</div>


</section>






<section className="cta">

<h2>
Prêt à faire passer votre activité
<br/>
au niveau supérieur ?
</h2>


<Link href="/contact">
Parler de votre projet →
</Link>


</section>



</main>

)


}