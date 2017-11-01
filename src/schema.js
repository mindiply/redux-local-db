function createSchemaDef (schemaDefinition) {
    const options = schemaDefinition.options || {}
    const defaultIdField = options.defaultIdField || 'id'
    let def = {entityTypes: {}, relations: {}}
    for (const entityType in schemaDefinition.entityTypes) {
        typeDef = schemaDefinition.entityTypes[entityType]
        schema.entityTypes[entityType] = {
            idField: typeDef.defaultIdField || defaultIdField,
            relations: {}
        }
    }
    for (const relationName in schemaDefinition.relations) {
        const {
            fromLinkType,
            fromEntityType,
            fromName,
            toLinkType,
            toEntityType,
            toName
        } = schemaDefinition.relations[relationName]
        let fromEntity = def.entityTypes[fromEntityType]
        fromEntity.relations[fromName] = {
            type: fromLinkType,
            entityType: toLinkType,
            relationName
        }
        let toEntity = def.entityTypes[toEntityType]
        toEntity.relations[toName] = {
            type: toLinkType,
            entityType: fromEntityType,
            relationName
        }
        schemaDefinition.relations[relationName] = {
            name: relationName,
            forwardRelation: {
                type: fromLinkType,
                name: fromName
            },
            backwardRelation: {
                type: toLinkType,
                name: toName
            }
        }
    }
    return def
}


function createSchema (schemaDefinition) {
    if (!schemaDefinition ||
        !schemaDefinition.entityTypes ||
        !schemaDefinition.entityTypes.length ||
        !schemaDefinition.relations
    ) throw new Error('Invalid schema definition')

    let definition = createSchemaDef(schemaDefinition)
    let schema = { definition }
    schema.getEntityRelation = (entityType, relationName) => {
        if (!(entityType in definition.entityTypes)) throw new Error('Entity type not defined')
        const entityType = definition.entityTypes[entityType]
        if (!(relationName in entityType.relations)) throw new Error('Entity relation not defined')
        return entityType.relations[relationName]
    }
    schema.getIdField = (entityType) => {
        if (!(entityType in definition.entityTypes)) throw new Error('Unexpected entity')
        return[definition.entityTypes][entityType][idField]
    }
    return schema
}

export default createSchema
