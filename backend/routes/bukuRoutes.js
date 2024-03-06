const express = require('express')

// const { createNewBuku } = require('../controllers/bukuController')
const {
    createNewBuku, getBuku, getBukuSatu, updateBuku, deleteBuku,
} = require('../controllers/bukuController')

const router = express.Router()

    // GET all data buku
router.get('/', getBuku)

    // Get single buku
router.get('/:id', getBukuSatu)

    // POST new buku
router.post('/', createNewBuku)

    // UPDATE buku
router.patch('/:id', updateBuku)

    // DELETE buku
router.delete('/:id', deleteBuku)

module.exports = router