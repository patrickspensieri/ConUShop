
let identityMap = {}; //null object; will list objects as properties can add properties with []

//ASSUMING WE ARE MAPPING PER MODEL

add(className,object)
{   
    if (object){
        let mappedObject; // null object
        if (identityMap[className]){
            mappedObject = identityMap[className][object.model];
            if (mappedObject) {
                console.log("this object is already mapped");
                return mappedObject;
            }
            else {
                identityMap[className][object.model]= object;
            }
        }
        else{
            identityMap[className] = {};
            identityMap[className][object.model] = object;
            mappedObject = object;
        }
        return mappedObject;
    }
}

get(className,object)
{
    let mappedObject; //null object
    if (object){
        if (identityMap[className]){
            if (identityMap[className][object.model])
            mappedObject = identityMap[className][object.model];
            else{
                console.log('Error model number not found for that product');
            }
        }
        else
        {
            console.log('This device class does not exist in the identity map')
        }
    }
    return mappedObject;
}

delete(className, object)
{

}

clear()
{
    if (req.user) {
        console.log("Identity Map cannot be cleared, user is still logged in!")
    } 
    else {
        Object.keys(identityMap).forEach(key => {
            var deviceType = key;
            Object.keys(identityMap[deviceType]).forEach(key2 => {
                var deviceID = key2;
                delete identityMap[deviceType][deviceID];
                console.log("This item " + deviceID + ". Has been deleted from the Identity Map")
            });
        delete identityMap[deviceType];
        console.log("All items in " + deviceType + " has been deleted.")
        });       
    }
}
