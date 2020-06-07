//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

// criar o objeto que ira fazer operacoes no banco de dados

/*const db = {
    propriedade = "valor"
}*/ 

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de db para as op 

db.serialize(() => {
    //criar 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        ); 
    `)

//     //inserir dados

//    const query =`
//             INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 adress2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
//         `

//     const values = [
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Paperside",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]


//     function afterInsertData(err){
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)

//     }

//    db.run(query, values, afterInsertData)

//     //consultar

// //    db.all(`SELECT name FROM places`, function(err, rows){
// //         if(err) {
// //             return console.log(err)
// //         }

// //         console.log("Aqui estão seus registros: ")
// //         console.log(rows)
// //     })

//     //deletar

    // db.run(`DELETE FROM places WHERE ID = ?`, [0], function(err){
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")

    // })
}) 

