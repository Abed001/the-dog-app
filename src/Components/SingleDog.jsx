import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

// we are using the useparams to get the name from the url
const SingleDog = () => {
    const [dog, setDog] = useState([])
    const { name } = useParams()

    useEffect(() => {
        const fetchSingleDogData = async () => {
            try {
                //here we are using the name from the url to fetch the same dog data that we clicked
                //so we can have the data related to the dog we clicked on
                const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
                //here we are populating the data variable with the response coming from the fetch function.
                const data = await res.json()
                //here we are appending fetched data to set dogs so we can use the dogs array to obtain our 
                //wanted info for display
                setDog(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchSingleDogData()

    }, [name])

    return (
        <section className="main-container">
            {dog.map((item) => (
                <div className="Single-container" key={item.id}>
                    <article className="Single-left-article">
                        <img src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`} alt="" />

                    </article>
                    <article className="Single-right-article">
                        <h1>{item.name}</h1>
                        {item.description && <p className="Single-para">{item.description}</p>}

                        <ul>
                        <li>Bred For: {item.bred_for}</li>
                        <li>Height: {item.height.metric} cm</li>
                        <li>Weight: {item.weight.metric} kgs</li>
                        <li>Breed Group: {item.breed_group}</li>
                        <li>LifeSpan: {item.life_span}</li>
                        <li>Temperament: {item.temperament}</li>
                        </ul>
                        <Link className="back-button" to="/">&larr; Back</Link>

                    </article>
                </div>
            ))}

        </section>
    )


}
export default SingleDog;