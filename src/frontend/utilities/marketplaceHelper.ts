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
