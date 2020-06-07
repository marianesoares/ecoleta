const express = require("express")
const server = express()

//pegar o db

const db = require("./database/db")

//configurar pasta publica

server.use(express.static("public"))

//habilitar o req.body

server.use(express.urlencoded({ extended: true}))


//utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, 
    noCache: true
})

//pagina inicial 

server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um título"})

})

server.get("/create-point", (req, res) => {
   //req.query: query strings 

   console.log(req.query)


   return res.render("create-point.html")

})

server.post("/savepoint", (req, res) => {

   //req.body
   //console.log(req.body)
   //inserir dados


      const query =`
               INSERT INTO places (
                  image,
                  name,
                  address,
                  adress2,
                  state,
                  city,
                  items
               ) VALUES (?,?,?,?,?,?,?);
         `

      const values = [
         req.body.image,
         req.body.name,
         req.body.address,
         req.body.adress2,
         req.body.state,
         req.body.city,
         req.body.items    
      ]


      function afterInsertData(err){
         if(err) {
               console.log(err)
               return res.send("Erro no cadastro!")
         }

         console.log("Cadastrado com sucesso")
         console.log(this)

         return res.render("create-point.html", {saved: true})

      }

      db.run(query, values, afterInsertData)

 
})


server.get("/search", (req, res) => {

   const search = req.query.search

   if(search == ""){
      //pesquisa vazia
     return res.render("search-results.html", {total: 0})

   }




   // pegar os dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length

          //  console.log("Aqui estão seus registros: ")
            //console.log(rows)

        return res.render("search-results.html", {places: rows, total: total})

    })


 

   
 
 })
//ligar o servidor

server.listen(3000)
