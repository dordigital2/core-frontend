cd /root/paul-web/app
git pull
yarn
yarn build
cp -R dist/* /var/www/paul-web
echo "Done!"