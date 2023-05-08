
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


const Home = () => {
    const [dogs, setDogs] = useState([''])
    const [text, setText] = useState("")
    const [searched, setSearched] = useState(false)
    useEffect(() => {
        const fetchDogData = async () => {
            try {
                const res = await fetch("https://api.thedogapi.com/v1/breeds")
                const data = await res.json()
                setDogs(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        setSearched(false)
        fetchDogData()
    }, [])

    const searchForDog = async () => {
        try {
            const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${text}`)
            const data = await res.json()
            setDogs(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        searchForDog()
        setSearched(true)

    }






    return (
        < div className="Home-main-container" >
            {!dogs ? <h1 className="Home-h1">loading...</h1> :
                <section>
                    {dogs.length} dogs
                    <div className="Home-appname">
                        <h1 className="Home-heading-size">The Dog App</h1></div>

                    <div className="Home-appname">
                        <p>This app is powered by <a href="https://thedogapi.com">The Dog Api</a></p></div>
                    <form onSubmit={handleSubmit} action="" className="Home-appname">
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Search for a dog / breed" className="Home-input-size" />
                        <button >button</button>
                    </form>

                </section>
            }
          
            <div className="Home-map-images">
           { /*The first block of code will be rendered if searched is falsy,
                and the second block of code will be rendered if searched is truthy.
                Both blocks of code are identical, except for the source of the img element's src attribute.
                In the first block, the img source is set to the dog.image.url property. In the second block,
                it is set to a string generated from the dog's reference_image_id.*/}
                {!searched ? (
                    dogs.map((dog) => (
                        <Link className='Home-link' to={`/${dog.name}`} key={dog.id}>
                            <article>
                                <img className="Home-img" src={dog.image?.url} loading="lazy" />
                                <h3>{dog.name}</h3>
                                <p>Bred For: {!dog.bred_for ? "N/A" : dog.bred_for}</p>
                            </article>
                        </Link>

                    ))) : (
                    dogs.map((dog) => (
                        <Link className='Home-link' to={`/${dog.name}`} key={dog.id}>
                            <article>
                                <img className="Home-img" src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} loading="lazy" />
                                <h3>{dog.name}</h3>
                                <p>Bred For: {!dog.bred_for ? "N/A" : dog.bred_for}</p>
                            </article>
                        </Link>

                    )))}


            </div>

        </div>
    )

}
export default Home;