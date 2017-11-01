const testSchema = {
    entityTypes: {
        user: {},
        team: {},
        bar: {idField: 'id'},
        checklistItem: {}
    },
    relations: {
        'user.teams': {
            fromLinkType: 'set',
            fromEntityType: 'user',
            fromName: 'teams',
            toLinkType: 'parent',
            toEntityType: 'team',
            toName: 'ofUser'
        },
        'team.bars': {
            fromLinkType: 'set',
            fromEntityType: 'team',
            fromName: 'bars,',
            toLinkType: 'parent',
            toEntityType: 'bar',
            toName: 'ofTeam'
        },
        'bar.checklist': {
            fromLinkType: 'array',
            fromEntityType: 'bar',
            fromName: 'checklist,',
            toLinkType: 'parent',
            toEntityType: 'checklistItem',
            toName: 'ofBar'
        }
    },
    options: {
        defaultIdField: '_id'
    }
}

const validatedSchema = {
    entityTypes: {
        user: {
            relations: {
                teams: {type: 'set', entityType: 'team'}
            }
        },
        team: {
            relations: {
                ofUser: {type: 'parent', entityType: 'user'},
                bars: {type: 'set', entityType: 'bar'}
            }
        },
        bar: {
            relations: {
                ofTeam: {type: 'parent', entityType: 'team'},
                checklist: {type: 'array', entityType: 'checklistItem'}
            }
        },
        checklistItem: {
            relations: {
                ofTeam: {type: 'parent', entityType: 'bar'}
            }
        }
    }
}
