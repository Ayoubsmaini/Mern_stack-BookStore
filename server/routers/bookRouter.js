const router = require('express').Router()
const {getAll,create,getById,remove,update,getBooksByCategory,getAllBooksPopulate,updateManyByCategory} = require('../controllers/bookController')
const isAuth = require('../middlewares/isAuthenticated')
router.get('/',getAll)
router.get('/:id',getById)
router.get('/populate',getAllBooksPopulate)
router.get('/category/:id',getBooksByCategory)
router.post('/',create)
router.delete('/:id',isAuth,remove)
router.put('/:id',isAuth,update)
router.put('/updateMany/:categoryId',isAuth, updateManyByCategory);



module.exports = router
