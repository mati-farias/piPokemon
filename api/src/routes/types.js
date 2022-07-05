
const { Router } = require("express");
const axios = require('axios')
const { Type } = require("../db.js");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const api = await axios('https://pokeapi.co/api/v2/type');
        const types = api.data.results.map(e => e.name)
        
        for (let i = 0; i<types.length; i++){
            await Type.findOrCreate({where: {name: types[i]}})
           
        }
        let answer = await Type.findAll()
        return res.send(answer);
    } catch (error) {

        res.status(400).send(error.message)
    }

   
   
    
    
})



module.exports = router;