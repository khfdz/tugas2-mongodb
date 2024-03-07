const express = require('express')
const Buku = require('../models/bukuModel')
const mongoose = require('mongoose')

// Get all buku
const getBuku = async (req, res) => {
    // const buku = await Buku.find({})
    // res.status(200).json(buku)

    try {
        const buku = await Buku.find({})
        res.status(200).json(buku)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

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

module.exports = {
    getBuku,
    getBukuSatu,
    createNewBuku,
    deleteBuku,
    updateBuku
}