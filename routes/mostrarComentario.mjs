import {verComentarios} from  '../controllers/comentario.mjs'
import express from 'express'
const router =express.Router();

router.get('/:_id/:publicationId',verComentarios)

export {router}