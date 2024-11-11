const TodoController=require('../controllers/todo.controller')
const TodoModel=require('../models/todo.model')
const httpMocks=require('node-mocks-http')
const newTodo=require('./mock_data/newTodo.json')
TodoModel.create=jest.fn()

let req, res, next
beforeEach(()=>{
    req=httpMocks.createRequest()
    res=httpMocks.createResponse()
    next=null
})

describe('TodoController.createTodo',()=>{
    beforeEach(()=>{
        req.body=newTodo
    })
    it('A createTodo-nak fgv-nek kellene lennie',()=>{
        expect(typeof TodoController.createTodo).toBe('function')
    })

    it('A TodoModel.create metódust a newTodo-val kellene meghívni',()=>{
        TodoController.createTodo(req,res,next)
        expect(TodoModel.create).toHaveBeenCalledWith(newTodo)
    })
    it('Ha sikeresen fut le a create fgv, akkor 201 status kódót kellene visszaküldeni',()=>{
        TodoController.createTodo(req,res,next)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBe(true)
    })
    it('A válaszban Json adatot kellene kapnunk',()=>{
        TodoModel.create.mockReturnValue(newTodo)
        TodoController.createTodo(req,res,next)
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })
})