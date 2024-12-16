function getImgUrl (name) {
    return new URL(`../assets/items/${name}`, import.meta.url)
}

export {getImgUrl}