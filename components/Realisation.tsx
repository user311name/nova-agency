const projets = [
  {
    titre: "Barber Studio",
    categorie: "Barber",
    image: "/barber.png",
  },

  {
    titre: "STORM Performance",
    categorie: "Coaching",
    image: "/storm.png",
  },

  {
    titre: "L'Atelier",
    categorie: "Restaurant",
    image: "/atelier.png",
  },

  {
    titre: "Clément D.",
    categorie: "Coach",
    image: "/clement.png",
  },
];


export default function Realisations(){

return (

<section className="realisations">


<div className="section-title">

<p>
NOS RÉALISATIONS
</p>

<h2>
Des projets pensés
<br/>
pour des entreprises ambitieuses.
</h2>

</div>



<div className="projects-grid">


{
projets.map((projet,index)=>(


<div className="project-card" key={index}>


<img 
src={projet.image}
alt={projet.titre}
/>


<div className="project-info">


<h3>
{projet.titre}
</h3>


<span>
{projet.categorie}
</span>


<a href="#">
Voir le projet →
</a>


</div>


</div>


))
}



</div>



</section>

)

}