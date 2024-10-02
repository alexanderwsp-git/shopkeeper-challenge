mkdir shopkeeper-backend
cd shopkeeper-backend
npm init -y

npm install typescript ts-node express prisma @prisma/client pg dotenv
npm install --save-dev @types/express

npx prisma init

DATABASE_URL=

npx prisma db pull

npx prisma generate