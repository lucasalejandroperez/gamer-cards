export const getLevelDescription = (level:number) => {
    let levelDescription = '';
    
    switch (level) {
        case 0:
            levelDescription = 'Diamond';
            break;
        case 1:
            levelDescription = 'Gold';
            break;
        case 2:
            levelDescription = 'Silver'
            break;
        default:
            levelDescription = 'Bronze';
            break;
    }

    return levelDescription;
}

export const getLevelColor = (level:number) => {
    let levelColor = '';

    switch (level) {
        case 0:
            levelColor = '#7a2f65';
            break;
        case 1:
            levelColor = '#ffa500';
            break;
        case 2:
            levelColor = '#c0c0c0'
            break;
        default:
            levelColor = '#cd7f32';
            break;
    }

    return levelColor;
}

export const getLevelImage = (level:number) => {
    let levelImage = '';

    switch (level) {
        case 0:
            levelImage = '../assets/images/diamond.png';
            break;
        case 1:
            levelImage = '../assets/images/gold.png';
            break;
        case 2:
            levelImage = '../assets/images/silver.png'
            break;
        default:
            levelImage = '../assets/images/bronze.png';
            break;
    }

    return levelImage;
}

export const getShortenedAddressAccount = (address:string) => {
    let shortenedAddress = address.substring(0, 6);
    shortenedAddress += '...';
    shortenedAddress += address.substring(address.length - 4, address.length);

    return shortenedAddress;
}