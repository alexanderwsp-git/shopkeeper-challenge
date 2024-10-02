Please change the `DATABASE_URL` value.  
To run the application use:
```bash
npm i
npx prisma generate
npm run start
```

URL: http://localhost:[port]/

API: http://localhost:[port]/api/v1/shopkeeper/listings
HEALTH_CHECK: API: http://localhost:[port]/api/v1/shopkeeper/healthz


Commands to build and run the applications
```bash
docker build --platform linux/amd64 -t shopkeeper:1.0 .
docker run --rm -it -p [port]:[port] \
  -e PORT=[port] \
  -e DATABASE_URL="postgresql://user:password@host:5432/db" \
  -e API_SHOPKEEPER_LISTINGS="/api/v1/shopkeeper/listings" \
  shopkeeper:1.0
```


Push the image to ecr
```bash
aws ecr get-login-password --region us-east-1 --profile xxxx | docker login --username AWS --password-stdin xxxx.dkr.ecr.us-east-1.amazonaws.com
```
```bash
docker tag shopkeeper:1.0 xxxx.dkr.ecr.us-east-1.amazonaws.com/shopkeeper:1.0
```
```bash
docker push xxxx.dkr.ecr.us-east-1.amazonaws.com/shopkeeper:1.0
```