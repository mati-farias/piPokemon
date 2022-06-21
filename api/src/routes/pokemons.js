const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { getPokemons, getPokemonByName, getPokemonById } = require("../methods.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const {name} = req.query
        if (name){
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
    
    let { name, hp, attack, defense, speed, height, weight, types } =
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
        
        const existe = await Pokemon.findOne({ where: { name: name } });
        if (existe) return res.json({ error: "El pokemon ya existe" });
        
        const pokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp: Number(hp),
            attack: Number(attack),
            defense: Number(defense),
            speed: Number(speed),
            height: Number(height),
            weight: Number(weight),
        });
        
        // if (!types.length) types = [1];
        
        // await pokemon.setTypes(types);
        res.json({ info: "Pokemon creado" });
    });
    





    router.get("/:idPokemon", async function(req,res){
        try {
            const { idPokemon } = req.params
            let idPoke = parseInt(idPokemon)
            let poke = await getPokemonById(idPoke)
            res.status(200).send(poke)
        } catch (error) {
            res.status(404).send("No se encontró pokemon con ese ID")
        }
    })
    
    module.exports = router;