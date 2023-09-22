

const fs = require('fs')
const crypto = require("crypto")

class userRepository{
    //criar os metodos

    constructor(fileName){
        if(!fileName){
            throw new Error ("Você informar um nome via arquivo!! ")
        }
        this.fileName = fileName;

        try {
            fs.accessSync(this.fileName)
            
        } catch (error) {
            fs.writeFileSync(this.fileName, '[novo]')
        }


    }


    async getAll(){
/*         //abrir arquivo
        const contents = await fs.promises.readFile(this.fileName)
        //ler arquivo
      
        
        const data = JSON.parse(contents)

        
        //retornar lista
        return data; */

        return JSON.parse(await fs.promises.readFile(this.fileName))
    }
    async create(atributos){
        // adicionar o id ao atributo

        atributos.id = this.ramdomId();

        // ler arquivo 
        const records = await this.getAll()
        //gravar na lista
        records.push(atributos) 
        //devolver para o arquivo
       await this.writeAll(records)
    }

    ramdomId(){
        return crypto.randomBytes(4).toString('hex')
    }

    async writeAll(records){
        return  await fs.promises.writeFile(this.fileName, JSON.stringify(records))
    }
}

//criando metodos


// teste

// new userRepository("user2.json")

const teste = async ()=>{
    const repo = new userRepository("user.json")
    const users = await repo.getAll();

   await repo.create({nome:"Pimenta", email: "toma@gmail.com"})

    console.log(users)
}

teste()