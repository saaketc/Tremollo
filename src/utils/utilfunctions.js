export const thumbnailCreator = (string) => {
    return string[0].toUpperCase();
}

export const month = (month) => {
    switch (month) {
        case 0:
           return  'January';
        case 1:
            return 'February';
       
        default:
            return 'New Month';
    }
}

export const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createSlug = (string) => {
    return string
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

}
export const removeSlug = (string) => {
    return string
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

}
