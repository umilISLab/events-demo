# Database structure and advanced search queries for the `EventNet` demo

## Alfio Ferrara

### Database structure

The `MongoDb` database is organized into a series of records, where each record represents a document annotated according to the following structure, of which we expand only the fields relevant for advanced search. For simplicity of exemplification we show only one event in the text and only one role associated with it.

```json
{
	"_id" : ObjectId("65c7a5b7562c62ad823b6a8b"),
	"id" : "CS_19480226_art0000019",
	"date" : ISODate("1948-02-26T00:00:00Z"),
	"title" : {...},
	"body" : [{...}, ...],
	"events" : [
		{
			"label" : "ROBBERY",
			"value" : ["rubato"],
			"text" : "rubato",
			"location" : "title",
			"roles" : [
				{
					"label" : "GOODS",
					"value" : ["il", "portamonete", "che"],
					"text" : "il portamonete che",
					"location" : "body"
				}
			]
		}]
}
```

In particular, for each document we have a **list of events**, each described by the following data structure:

- `label`: label representing the class of the event (e.g., `ROBBERY`)
- `value`: list of tokens that appear in the portion of text associated with the event
- `text`: complete portion of the non-tokenized text associated with the event
- `location`: placement of text in the document (i.e., `title` o `body`)

Each document is then associated with a **list of roles**, each described by the following data structure:

- `label`: label representing the type of role (e.g., `GOODS`)
- `value`: list of tokens that appear in the portion of text associated with the role
- `text`: complete portion of the non-tokenized text associated with the role
- `location`: placement of text in the document (i.e., `title` o `body`)

### Advanced search

We aim at supporting pseudo-textual queries with the following structure:

`Find [EVENT] where [ROLE | ANY] is [TEXT | ANY] `

Examples:

1. `Find SPEECH where SPEAKER` 

   > Find documents where there's a speech and we know the speaker

2. `Find SPEECH where SPEAKER is "Truman"`

> Find documents where there's a speech and the speaker is Truman

3. `Find SPEECH where [ANY] is "stati uniti"`

   > Find documents where there's a speech and the expression "stati uniti" appears in any role

### Supporting query composition

In order to support the interactive composition of queries, we first need a query that provides the list of **available roles** given a **event tipe**.

Example: get all the **roles** available for the event `SPEECH`

```json
[
  {
    $unwind: {path: "$events"},
  },
  {
    $project: {events: 1, _id: 0,},
  },
  {
    $match: {"events.label": "SPEECH",}, /* replace with other event */
  },
  {
    $unwind: {path: "$events.roles"},
  },
  {
    $group: {_id: "$events.roles.label", count: {$sum: 1}},
  },
  {
    $sort: {count: -1}}
]
```

This query provides also the frequency of all the roles (we sort the results accordingly), which may be useful in suggesting the options for query composition.

Run the query by:

```json
db.roles.aggregate(pipeline)
```

Where the `pipeline` is the previous list.

Example of outputs:

```json
{
  "_id": "SPEAKER",
  "count": 1017
},
{
  "_id": "TIME",
  "count": 279
},
{
  "_id": "TOPIC",
  "count": 130
},
{
  "_id": "VENUE",
  "count": 122
},
...
```

### Events with roles

Example: `Find SPEECH where SPEAKER` 

```json
db.roles.find(
{
    'events': {
        '$elemMatch': {
            'label': 'SPEECH',
            'roles': {
                '$elemMatch': {'label': 'SPEAKER'}
                }
            }
        }
    }
)
```

The **output will be the entire document**. To give just an example, we provide here only a summary of the events therein contained.

```text
Document CS_19480215_art0000010
----------------
SPEECH discorso
	 SPEAKER lui suo
	 TIME del marzo di settembre
	 SPEAKER di Stalin
	 TIME del marzo
=================
Document CS_19480229_art0000012
----------------
SPEECH None
	 SPEAKER il segretario generale sindacale Sailliint
=================
Document CS_19480212_art0000013
----------------
SPEECH discorso
	 SPEAKER del ministro degli Esteri svedese
=================
Document CS_19480220_art0000008
----------------
SPEECH il discorso pronuncia
	 TIME ieri sera
	 PLACE a Louisville
	 SPEAKER da uno dei più alti funzionari del Dipartimento di Stato
	 SPEAKER suo
	 SPEAKER da Truman
	 TIME stasera di stasera
	 VENUE al tradizionale banchetto per il Jackson anda Jefferson Day »
	 TIME del mese scorso
=================
...
```

### Events with qualified roles

Example:  `Find SPEECH where SPEAKER is "Truman"`

We use just a *regex*, not a text index, so any string can be passed to the query as it is specified by the user.

```json
db.roles.find( {
    'events': {
        '$elemMatch': {
            'label': 'SPEECH',
            'roles': {
                '$elemMatch': {
                    'label': 'SPEAKER',
                    'text': {'$regex': '(?i)Truman'}
                    }
                }
            }
        }
    } )
```

Sample of aswers

```
Document CS_19480220_art0000008
----------------
SPEECH il discorso pronuncia
	 TIME ieri sera
	 PLACE a Louisville
	 SPEAKER da uno dei più alti funzionari del Dipartimento di Stato
	 SPEAKER suo
	 SPEAKER da Truman
	 TIME stasera di stasera
	 VENUE al tradizionale banchetto per il Jackson anda Jefferson Day »
	 TIME del mese scorso
=================
Document CS_19480319_art0000004
----------------
SPEECH discorso
	 SPEAKER di Truman
=================
Document CS_19480320_art0000005
----------------
SPEECH discorso
	 SPEAKER suo
	 SPEAKER suo
	 SPEAKER di Truman
	 SPEAKER , segretario del
=================
...
```

### Events with qualified role extended to ANY role

Example: `Find SPEECH where [ANY] is "stati uniti"`

```json
db.roles.find({
    'events': {
        '$elemMatch': {
            'label': 'SPEECH',
            'roles': {
                '$elemMatch': {
                    'text': {'$regex': '(?i)stati uniti'}
                    }
                }
            }
        }
    })

```

Sample of answers

```
Document CS_19480210_art0000038
----------------
SPEECH pronunciare un discorso discorso
	 TIME Quella stessa sera
	 SPEAKER Roosevelt
	 VENUE radio
	 TOPIC sulla politica degli i Stati Uniti
=================
Document CS_19480319_art0000003
----------------
SPEECH discorso pronunciato
	 TIME Ieri
	 SPEAKER dal Presidente degli Stati Uniti
=================
Document CS_19480402_art0000002
----------------
SPEECH un discorso pronunciato
	 PLACE a Madison , nel Wisconsin
	 SPEAKER ambasciatore norvegese negli Stati Uniti barone Morgenstierne
=================
Document CS_19481026_art0000005
----------------
SPEECH discorso
	 SPEAKER del delegato degli Stati Uniti
	 CONTAINING_EVENT questa sessione
=================
```



### Boolean composition of clauses

In order to support more complex queries with conjunction and/or disjunction, such as

`Find SPEECH where PLACE is "Rome" AND SPEAKER is "de gasperi"`

We can just run queries with slighlty different clauses.

For example this query finds speeches where Truman was either the `SPEAKER` or the `TOPIC`

```json
db.roles.find( {
    'events': {
        '$elemMatch': {
            'label': 'SPEECH',
            'roles': {
                '$elemMatch': {
                    'label': {'$in': ['SPEAKER', 'TOPIC']},
                    'text': {'$regex': '(?i)Truman'}
                    }
                }
            }
        }
    } )
```

Or, for conjunction, this query finds speeches where we have both the `SPEAKER` and the `TOPIC`.

```json
db.roles.find(
{
		'$and': [
      {
        'events': {
            '$elemMatch': {
                'label': 'SPEECH',
                'roles': {
                    '$elemMatch': {'label': 'SPEAKER'}
                    }
                }
            }
      },
      {
        'events': {
            '$elemMatch': {
                'label': 'SPEECH',
                'roles': {
                    '$elemMatch': {'label': 'TOPIC'}
                    }
                }
            }
      }
  	]
	}
)
```

