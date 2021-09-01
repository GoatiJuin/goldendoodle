
import React, { useState, useEffect, useCallback } from 'react';
import { fetchDogBreeds } from '../api';

const DogBreedSelector = () => {
    const [breedsList, setBreedsList] = useState();
    const [selectedBreed, setSelectedBreed] = useState();

    const fetchBreeds = () => {
        if (!breedsList) {
            const apiPromise = fetchDogBreeds();
            Promise.resolve(apiPromise).then(resp => {
                setBreedsList(resp);
            })
        }
    }

    useEffect(() => {
        if (!breedsList) {
            memoizedCallback();
        }

    }, [breedsList])

    const memoizedCallback = useCallback(() => {
        fetchBreeds();
    }, [breedsList],
    );

    const handleClick = (e) => {
        setSelectedBreed(breedsList.find(breed => breed.name === e.target.innerText));
    }

    return (
        <section>
            {selectedBreed ?
                <div className="breed-image-container">
                    <h1 className="breed-name">{selectedBreed.name}</h1>
                    <img src={selectedBreed.imgSrc} alt="breed" />
                </div>
                :
                <h1>Please click on a dog breed</h1>
            }
            <div className="breed-list-container">
                <DogBreedsList breedsList={breedsList} handleClick={handleClick} />
            </div>
        </section>
    )
}

class DogBreedsList extends React.PureComponent {
    render() {
        return (
            <ul className="breed-list">
                {this.props.breedsList && this.props.breedsList.map((breed) => {
                    return <li onClick={this.props.handleClick} key={breed.name}>{breed.name}</li>
                })}
            </ul>
        )
    }
}

export default DogBreedSelector;


