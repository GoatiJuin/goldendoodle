function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const fetchDogBreeds = () => {
    const breeds = [];
    const images = importAll(require.context('../public/images', false, /\.(png|jpe?g|svg)$/));

    Object.entries(images).forEach(
        ([key]) => {
            const name = key.replace("_", " ").replace(".jpg", "");
            breeds.push({ name: name, imgSrc: `/images/${key}` })
        }
    );

    return Promise.resolve(breeds)
}

export { fetchDogBreeds }