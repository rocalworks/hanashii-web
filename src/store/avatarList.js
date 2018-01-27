var avatars = {
    "Meowe": {
        "displayName": "Meowe",
        "completeName": "Meowe Asdfgh",
        "isNarrator": true,
        "imageURL": "https://react-bootstrap.github.io/thumbnail.png",
        "bubbleColor": "gray",
        description: ""
    },
    "Wuff": {
        "displayName": "Wuff",
        "completeName": "Wuff Qwerty",
        "isNarrator": false,
        "imageURL": "https://react-bootstrap.github.io/thumbnail.png",
        "bubbleColor": "skyblue",
        description: ""
    }
}

export default function getAvatar(name) {
    if (avatars[name] !== undefined) 
        return avatars[name];
    else {
        var unknown = {
            displayName: name, 
            completeName: name, 
            isNarrator: false,
            imageURL: "https://react-bootstrap.github.io/thumbnail.png",
            notOnList: true
        }
        
        return unknown;
    }
}