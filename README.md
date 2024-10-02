Please change the DATABASE_URL value.
To run the application use:
```bash
npm i
npm run start
```


Commands to build and run the applications
```bash
docker build -t shopkeeper:1.0 .
docker run --rm -it -p 1080:1080 \
  -e PORT=1080 \
  -e DATABASE_URL="postgresql://user:password@host:5432/db" \
  -e API_SHOPKEEPER_LISTINGS="/api/v1/shopkeeper/listings" \
  shopkeeper:1.0
```


Push the image
```bash
aws ecr get-login-password --region us-east-1 --profile xxxx | docker login --username AWS --password-stdin xxxx.dkr.ecr.us-east-1.amazonaws.com
docker tag shopkeeper:1.0 xxxx.dkr.ecr.us-east-1.amazonaws.com/shopkeeper:1.0
docker push xxxx.dkr.ecr.us-east-1.amazonaws.com/shopkeeper:1.0
```