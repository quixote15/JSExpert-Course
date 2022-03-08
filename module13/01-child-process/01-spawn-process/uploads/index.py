# python3 index.py '{"filePath": "my-data.csv", "url": "http://localhost:3000"}'
import sys
import json
from urllib import request

def main():
    item = json.loads(sys.argv[1])
    print(item.get('name'))
    filepath = item.get('filePath')

    url = item.get('url')
    data = open(filepath, 'rb').read()
    print(data)
    req = request.Request(url, data)
    response = request.urlopen(req).read().decode('utf-8')
    print(response)



if __name__ == '__main__':
    main()