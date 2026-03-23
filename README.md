// добавление новых книг в ДЗ через консоль

curl -H "Content-Type: application/json" \
  -d '{"title":"My Book","description":"This is a great book"}' \
  http://localhost:3000/books

// изменение книг в ДЗ через консоль

curl -H "Content-Type: application/json" -X PUT  -d '{"title":"My Books","description":"This
 is a nice book update"}'   http://localhost:3000/books/69bbee21fcb3f2c21665303b

// удаление книг в ДЗ через консоль

 curl localhost:3000/books/69bd7e471a3984e1e7e1efed -X DELETE