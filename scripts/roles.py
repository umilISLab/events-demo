"""Creates a new collection `roles` from the EventNet data

Each event in the new collection will have the following structure:
- `label` (str): label representing the class of the event (e.g., `ROBBERY`)
- `value` (list): list of tokens that appear in the portion of text associated with the event
- `text` (str): complete portion of the non-tokenized text associated with the event
- `location` (str): placement of text in the document (i.e., `title` o `body`)
- `roles` (list): list of roles for the event
Each role in `roles` will have the following structure:
- `label` (str): label representing the type of role (e.g., `GOODS`)
- `value` (list): list of tokens that appear in the portion of text associated with the role
- `text` (str): complete portion of the non-tokenized text associated with the role
- `location` (str): placement of text in the document (i.e., `title` o `body`)
"""
import json 
import pymongo
import argparse
from datetime import datetime
from tqdm import tqdm


def spans2events(spans, location='title', events=None):
    if events is None:
        events = {}
    for k, v in spans.items():
        to_process = []
        if "*" in k:
            to_process.append((k, v))
        else:
            if k in events.keys():
                if events[k]['value'] is None:
                    events[k]['value'] = v 
                if events[k]['text'] is None:
                    events[k]['text'] = " ".join(v)
            else:
                events[k] = {'label': k, 'value': v, 'text': " ".join(v), 'location': location, 'roles': []}
        for k, v in to_process:
            role, event = k.split("*")
            r = {'label': role, 'value': v, 'text': " ".join(v), 'location': location}
            if event in events.keys():
                events[event]['roles'].append(r)
            else:
                events[event] = {'label': event, 'value': None, 'text': None, 'location': location, 
                                'roles': [r]}
    return events
        
def doc2record(doc):
    record = {'id': doc['id'], 'date': datetime.strptime(doc['date'], "%Y-%m-%d")}
    title = doc['title']
    body = doc['body']
    record['title'] = title
    record['body'] = body
    events = {}
    events = spans2events(title['spans'], 'title', events=events)
    for b in body:
        events = spans2events(b['spans'], 'body', events=events)
    record['events'] = list(events.values())
    return record
    
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-d', '--dbname', metavar='str', type=str, nargs=1, help='name of the mongodb')
    parser.add_argument(
        '-f', '--file', type=str, nargs=1, help='event-net json file')
    args = parser.parse_args()
    if args.dbname is None:
        parser.print_help()
    elif args.file is None:
        parser.print_help()
    else:
        event_net_file_path = args.file[0] 
        db = pymongo.MongoClient()['eventnet']['roles']
        records = []
        with open(event_net_file_path, 'r') as infile:
            data = json.load(infile)
        for doc in tqdm(data):
            record = doc2record(doc)
            records.append(record)
        # test = records[0]
        # for e in test['events']:
        #     print(e['label'])
        #     print([r['label'] for r in e['roles']])
        #     print("==========")
        db.insert_many(records)
