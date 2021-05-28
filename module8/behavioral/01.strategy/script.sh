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