import _ from 'lodash'

function addEntityToArrayRelation(relationData = {}, entityId, targetId) {
    if (targetId in relationData && entityId in relationData[targetId]) return relationData
    let newTarget = targetId in relationData ? Object.assign({}, relationData[targetId]) : {}
    let maxIndex = 0
    _.values(relationData[targetId]).forEach(index => {
        if (index > maxIndex) maxIndex = index
    })
    newTarget[entityId] = maxIndex
    return Object.assign({}, relationData, {[targetId]: maxIndex + 1})
}

function arrayRemoveEntityFromRelation (relationData = {}, entityId, targetId) {
    if (!(targetId in relationData)) return relationData
    let newTarget = Object.assign({}, relationData[targetId])
    const removedIndex = newTarget[entityId]
    delete newTarget[entityId]
    for (const otherId in newTarget) {
        let index = newTarget[otherId]
        if (index < removedIndex) continue
        newTarget[otherId] = index - 1
    }
    return Object.assign({}, relationData, {[targetId]: newTarget})
}

function arrayReplaceEntityIdInRelation (relationData = {}, oldEntityId, newEntityId, targetId) {
    if (!(targetId in relationData && oldEntityId in relationData[targetId])) return relationData
    let newTarget = Object.assign({}, relationData[targetId])
    newTarget[newEntityId] = newTarget[oldEntityId]
    delete newTarget[oldEntityId]
    return Object.assign({}, relationData, {[targetId]: newTarget})
}

function addEntityToSetRelation (relationData = {}, entityId, targetId) {
    if (targetId in relationData && entityId in relationData[targetId]) return relationData
    let newTarget = Object.assign(
        {},
        targetId in relationData ? Object.assign({}, relationData[targetId]) : {},
        {[entityId]: true}
    )
    return Object.assign({}, relationData, {[targetId]: newTarget})
}

function setRemoveEntityFromRelation (relationData = {}, entityId, targetId) {
    if (!(targetId in relationData && entityId in relationData[targetId])) return relationData
    return Object.assign({}, relationData, {targetId: _.omit(relationData[targetId], [entityId])})
}

function setReplaceEntityInRelation (relationData = {}, oldEntityId, newEntityId, targetId) {
    if (!(targetId in relationData)) return relationData
    let newTarget = Object.assign({}, relationData[targetId])
    newTarget[newEntityId] = true
    if (oldEntityId in newTarget) delete newTarget[oldEntityId]
    return Object.assign({}, relationData, {[targetId]: newTarget})
}

function setOrReplaceEntityInSingleRelation (relationData = {}, entityId, targetId) {
    if (targetId in relationData && relationData[targetId] === entityId) return relationData
    return Object.assign({}, relationData, {[targetId]: entityId})
}

function unsetEntityInSingleRelation(relationData = {}, entityId, targetId) {
    if (!(targetId in relationData && relationData[targetId] === entityId)) return relationData
    return _.omit(relationData, targetId)
}

const addFnByRelationType = {
    'array': addEntityToArrayRelation,
    'set': addEntityToSetRelation,
    'parent': setOrReplaceEntityInSingleRelation
}

function addEntityToRelation(relationType, relationData, entityId, targetId) {
    if (!(relationType in addFnByRelationType)) return relationData
    return addFnByRelationType[relationType](relationData, entityId, targetId)
}

function createApp (schema) {

    const addEntityToRelation = (state, action) => {
        const {entityType, entity, relationName, targetId} = action
        if (!entity || !entity._id) return state
        const entityId = entity._id
        const {relationKey, forwardRelation, backwardRelation} = schema.getEntityRelation(entityType, relationName)
        let relationData = relationKey in state ? state[relationKey] : null
        let newRelationData = relationData ? Object.assign({}, relationData) : {[forwardRelation.name]: {}, [backwardRelation.name]: {}}
        newRelationData[forwardRelation.name] = addEntityToRelation(forwardRelation.type, newRelationData[forwardRelation.name], entityId, targetId)
        newRelationData[backwardRelation.name] = addEntityToRelation(backwardRelation.type, newRelationData[backwardRelation.name], targetId, entityId)
        if (newRelationData === relationData) return state
        return Object.assign({}, state, {[relationKey]: newRelationData})
    }
}