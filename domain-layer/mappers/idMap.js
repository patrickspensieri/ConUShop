
let identityMap = {}; //null object; will list objects as properties can add properties with []

//ASSUMING WE ARE MAPPING PER MODEL
addToIdMap(className,object)
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

findFromIdMap()
{}

removeFromIdMap()
{}

clearIdMap()
{}

