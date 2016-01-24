
#update repository
git pull
#remove modules folder
#rm -f -r node_modules/
#npm install new modules
npm install
#restart all processes
npm run build

pm2 restart pm2.json
