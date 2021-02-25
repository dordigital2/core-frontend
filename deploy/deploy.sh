cd /root/paul-web/app
echo "Pull git repository"
git pull
echo "Install new dependencies"
yarn
echo "Build"
yarn build
echo "Copy dist to final destination"
cp -R dist/* /var/www/paul-web
echo "Done!"