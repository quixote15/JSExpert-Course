IMAGE_URL="https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png"

BACKGROUND_URL="https://i.ytimg.com/vi/LTqV4Bfhelc/maxresdefault.jpg"
curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"

autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"