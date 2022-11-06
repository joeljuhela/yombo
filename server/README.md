# YOMBO server

In this directory, create a `.env` file like this:
```bash
SECRET=a4742e6957c0d5a7ba966a1625e820649f691bc6de33dad58e198b881cf5b275dd65ee002363de2e7f135494c8537657b96c1591441cae077b50187b787ec050
```
Hint: `crypto.randomBytes(64).toString('hex')`
## Production
```
npm start
```

## Development
```
npm run dev
```

## Initialize the database
```
npm run drop-database
```
