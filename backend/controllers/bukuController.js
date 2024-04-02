const express = require('express')
const Buku = require('../models/bukuModel')
const mongoose = require('mongoose')

// Get all buku
const getBuku = async (req, res) => {
    try {
        const search = req.query.q || "";
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const bukuCount = await Buku.countDocuments({
            $or: [ 
                { judul: { $regex: search, $options: "i" } }, 
                { penulis: { $regex: search, $options: "i" } },
                { genre: { $regex: search, $options: "i" } }
            ]
        });

        const buku = await Buku.find({
            $or: [ 
                { judul: { $regex: search, $options: "i" } }, 
                { penulis: { $regex: search, $options: "i" } },
                { genre: { $regex: search, $options: "i" } }
            ]
        }).skip(skip).limit(limit); 

        const totalPages = Math.ceil(bukuCount / limit);

        res.status(200).json({ buku, totalPages });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Get single buku
const getBukuSatu = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    const buku = await Buku.findById(id)

    if (!buku) {
       return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    res.status(200).json(buku)
}

// POST new buku
const createNewBuku = async (req, res) => {
    const {judul, penulis, penerbit, genre} = req.body

    let emptyFields = []

    if(!judul) {
        emptyFields.push('judul')
    }
    if(!penulis) {
        emptyFields.push('penulis')
    }
    if(!penerbit) {
        emptyFields.push('penerbit')
    }
    if(!genre) {
        emptyFields.push('genre')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Mohon isi semua kolom', emptyFields})
    }

    try {
        const buku = await Buku.create({judul, penulis, penerbit, genre})
        res.status(200).json(buku)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



// DELETE buku
const deleteBuku = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    const buku = await Buku.findOneAndDelete({_id: id})

    if (!buku) {
       return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    res.status(200).json(buku)
}

// UPDATE buku
const updateBuku = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    const buku = await Buku.findOneAndUpdate({_id: id}, {
        ...req.body
    }) 

    if (!buku) {
       return res.status(404).json({error: 'Buku Tidak Ditemukan'})
    }

    res.status(200).json(buku)
}

// SEARCH buku
// async function searchBuku(req, res) {
//     const { keyword } = req.query;
//     try {
//       const query = {
//         $or: [
//           { judul: { $regex: keyword, $options: "i" } },
//           { penulis: { $regex: keyword, $options: "i" } },
//           { penerbit: { $regex: keyword, $options: "i" } },
//           { genre: { $regex: keyword, $options: "i" } },
//         ],
//       };
//       const results = await Buku.find(query);
//       res.status(200).json({ success: true, data: results });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

// const searchBuku = async (req, res) => {
//   try {
//     const query = req.query.q; // Ambil query pencarian dari URL

//     // Lakukan pencarian menggunakan $text operator
//     const result = await Buku.find({ $text: { $search: query } });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const searchBuku = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.q || "";
        let sort = req.query.sort || "updatedAt";
        let genre = req.query.genre || "All";

        const genreOptions = [
            "Novel",
            "Sains",
            "Self Improvement"
        ];

        genre === "All"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(","));

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const buku = await Buku.find({ $text: { $search: search }})
        .where("genre")
        .in([...genre])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

        const total = await Buku.countDocuments({
            genre: { $in: [...genre] },
            $text: { $search: search }
        });

        if (buku.length === 0) {
            return res.status(404).json({ error: "Buku tidak ditemukan" });
        }

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            buku,
        };

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};


module.exports = { createNewBuku, getBuku, getBukuSatu, updateBuku, deleteBuku, searchBuku };

module.exports = {
    getBuku,
    getBukuSatu,
    createNewBuku,
    deleteBuku,
    updateBuku,
    searchBuku
};