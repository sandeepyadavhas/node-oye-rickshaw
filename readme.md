To create Dummy data:

    curl --location --request POST 'http://127.0.0.1:8000/api/add-bulk-random-rickshaws'

To Update rickshaw location:

    curl --location --request POST 'http://127.0.0.1:8000/api/rickshaw-location' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "rickshaw_id": "072391b5-65a0-4900-af61-1a37ea27b767",
        "longitude": 77.0306756, "latitude": 28.4995432
    }'


To get rickshaw in nearby 200 meters:

    curl --location --request GET 'http://127.0.0.1:8000/api/nearby-rickshaws?longitude=77.0143849&latitude=28.4615351'

To get rickshaw in nearby 2000 meters:

    curl --location --request GET 'http://127.0.0.1:8000/api/nearby-rickshaws?longitude=77.0143849&latitude=28.4615351&max_distance_in_meters=2000'

To run the server:
    npm install
	node ./index.html
