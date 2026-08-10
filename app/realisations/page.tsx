import Image from "next/image";
import Link from "next/link";


const projets = [

  {
    titre: "NOIR BARBER",
    categorie: "Concept Website • Barber",
    description:
      "Création d’un site vitrine premium pour un salon de coiffure masculin.",
    image: "/projets/barber-home.png",
    concept: "/realisations/noir-barber",
    site: "https://noir-barber-weld.vercel.app",
  },


  {
    titre: "STORM",
    categorie: "Concept Website • E-commerce",
    description:
      "Création d’une expérience digitale premium pour une marque sport lifestyle.",
    image: "/projets/storm.png",
    concept: "/realisations/storm",
    site: "#",
  },


  {
    titre: "L'ATELIER",
    categorie: "Concept Website • Restaurant",
    description:
      "Création d’un univers digital élégant pour un restaurant.",
    image: "/projets/atelier.png",
    concept: "/realisations/atelier",
    site: "#",
  },


  {
    titre: "CLÉMENT D.",
    categorie: "Concept Website • Coach",
    description:
      "Création d’une présence digitale moderne pour un coach.",
    image: "/projets/clement.png",
    concept: "/realisations/clement",
    site: "#",
  },

];



export default function Realisations() {


return (

<main className="realisations-page">


<section className="real-header">


<p>
NOS RÉALISATIONS
</p>


<h1>
Sites de démonstration
<br/>
premium.
</h1>


<span>
Des créations imaginées pour présenter notre savoir-faire digital.
</span>


</section>




<section className="projects-grid">


{
projets.map((projet,index)=>(


<article 
className="project-card"
key={index}
>


<div className="project-image">


<Image
src={projet.image}
alt={projet.titre}
fill
sizes="(max-width:900px) 100vw, 33vw"
/>


</div>



<div className="project-info">


<span className="project-category">
{projet.categorie}
</span>



<h2>
{projet.titre}
</h2>



<p>
{projet.description}
</p>




<div className="project-buttons">


<Link href={projet.concept}>
Voir le concept →
</Link>



<a
href={projet.site}
target="_blank"
rel="noopener noreferrer"
>
Voir le site ↗
</a>


</div>



</div>


</article>


))


}


</section>


</main>

)

}