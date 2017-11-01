
function createInitialData (schema) {
    let initialState = {}
    const {entityTypes} = schema.def
    for (const entityType in entityTypes) {
        initialState[entityType] = {}
    }
    return initialState
}


function createApp (schema) {
    const initialDataState = createInitialData(schema)

    const addEntityToRelation = (state, action) => {
        const {entityType, entity} = action
        const keyField = schema.getIdField(entityType)
        if (!entityType || !entity || !entity[keyField]) return state
        let typeData = state[entityType] || null
        let newTypeData = typeData ? Object.assign({}, typeData) : {}
        
    }

}