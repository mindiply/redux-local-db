// Setup Actions

// Schema Actions
export function setDataSchema (schema) {

}

// Get the app, giving us a way to get back its root for selectors
export function getLocalDbApp (getAppRoot) {

}


// Actions


// Db Layer changes
export function loadDbData (entitiesData) {
    
}

export function flushingChangesToDb (transactionId, entityChanges) {
    
}

export function successChangesToDb (transactionId, entityChanges) {
    
}

export function failedChangesToDb (transactionId, entityChanges) {
    
}


// Local changes

export function createLocalEntity (entityType, data, parentEntityId = null) {
    
}

export function changeLocalData ( entityChanges ) {
    
}


// Access data

export function currentUnflushedTransaction () {

}


export function currentData () {

}
