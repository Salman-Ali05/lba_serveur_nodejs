const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');


module.exports = (db) => {

    router.get("/", async (req, res) => {
        try {
            const collection = db.collection("Products");
            const products = await collection.find({}).toArray();
            res.json(products);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits", err);
            res.status(500).json({ error: "Erreur lors de la récupération des produits" });
        }
    });

    router.post('/create', async (req, res) => {
        db.collection("Products").insertOne(req.body, function (err, res) {
            if (err) throw err;
            console.log("Produit ajouté avec succès");
        });
    });

    router.post('/update/:id', async (req, res) => {
        const id = req.params.id;
        const { name, type, price, rating, warranty_years } = req.body;

        db.collection("Products").updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, type, price, rating, warranty_years } },
            function (err) {
                if (err) throw err;
                console.log("Produit ajouté avec succès");
            }
        );
    });

    router.post('/delete/:id', async (req, res) => {
        const id = req.params.id;

        db.collection('Products').deleteOne(
            {
                _id: new ObjectId(id)
            }),
            function (err) {
                if (err) throw err;
                console.log("Produit ajouté avec succès");
            }
    })

    return router;
};
