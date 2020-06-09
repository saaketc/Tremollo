export const getUserType = typeNumber => {
    switch (typeNumber) {
        case 0:
            return "Casual listener";
    
        case 1:
            return "Guitarist";
    
        case 2:
            return "Pianist";
    
        case 3:
            return "Drummer";
    
        case 4:
            return "Singer";
        
        case 5:
            return "Disco jockie";
        
        case 6:
            return "Others";
        
        default:
            return "Listener";
    }
}