const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getPokemons, getPokemonByName, getPokemonById } = require("../methods.js");

const router = Router();



router.get("/", async (req, res) => {
    try {
        const {name} = req.query
        if (name){
            console.log("QUERY", name)
            let poke = await getPokemonByName(name)
            res.send(poke)
        }

        let poke = await getPokemons()
        res.send(poke)
        
    } catch (error) {
        res.status(404).send("No se encontraron pokemon")
    }
})




router.post("/", async function(req,res){
    // tengo que traer todos los tipos y guardarlos en un array con findAll(where: name === type).
    // voy a tener una [con todos los tipos].
    // pokemon.addType(type)

    let { name, hp, attack, defense, speed, height, weight, types,img } =
    req.body;
    if (
        isNaN(hp) ||
        isNaN(attack) ||
        isNaN(defense) ||
        isNaN(speed) ||
        isNaN(height) ||
        isNaN(weight)
        )
        return res.json({ info: "Todos los argumentos deberían ser número" });
        if (!name) return res.json({ error: "El nombre es obligatorio" });
        name = name.toLowerCase()
        const existe = await Pokemon.findOne({ where: { name: name } });
        if (existe) return res.json({ error: "El pokemon ya existe" });
        

        try {
            const pokemon = await Pokemon.create({
                name: name.toLowerCase(),
                hp: Number(hp),
                attack: Number(attack),
                defense: Number(defense),
                speed: Number(speed),
                height: Number(height),
                weight: Number(weight),
                img: img
            });
            
            let typeDB = await Type.findAll({where: {name: types.map(e => e)}})
            // let typesArray = typeDB.map(e => e.name)
            
            await pokemon.addTypes(typeDB)
            res.json({ info: "Pokemon creado" });
        } catch (error) {
            res.send(error)
        }

        
        // if (!types.length) types = [1];
        
        //  await pokemon.setTypes(types);
    });
    





    router.get("/:idPokemon", async function(req,res){
        const { idPokemon } = req.params
        try {
            if(idPokemon.length > 15){
                let db = await Pokemon.findByPk(idPokemon, {
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                          attributes: []
                        }
                      }
                })
                
                if(db){
                    let pokeDB = {
                        name: db.name,
                        hp: db.hp,
                        attack: db.attack,
                        defense: db.defense,
                        speed: db.speed,
                        height:db.height,
                        weight: db.weight,
                        img: db.img,
                        types: db.types.map(e => e.name)
                        
                    }
                    res.status(200).send(pokeDB)
                }
            }
            else{
                let idPoke = parseInt(idPokemon)
                console.log(idPoke)
                let poke = await getPokemonById(idPoke)
                res.status(200).send(poke)
            }
        } catch (error) {
            res.status(404).send("No se encontró pokemon con ese ID")
        }
    })
    
    module.exports = router;