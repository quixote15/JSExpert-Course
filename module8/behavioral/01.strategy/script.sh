docker run \
  --name postgres \
  -e POSTGRES_USER=quixote15 \
  -e POSTGRES_PASSWORD="senhasenha" \
  -e POSTGRES_DB=vilains \ 
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it postgres psql --username quixote15 --dbname vilains

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors


# mongodb

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=quixote15 \
  -e MONGO_INITDB_ROOT_PASSWORD=senhamongo \
  -p 27022:27022 \
  -d
  mongo:4

  docker run --name mongodb3 -e MONGO_INITDB_ROOT_USERNAME=quixote15 -e MONGO_INITDB_ROOT_PASSWORD=senhamongo -p 27018:27017 -d mongo:4