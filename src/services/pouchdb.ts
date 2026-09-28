import PouchDB from 'pouchdb-browser'

const db = new PouchDB('pos_local_db')

// simple wrapper exposing put/get/allDocs and a mock sync
const api = {
  put: (doc:any)=> db.put(doc),
  get: (id:string)=> db.get(id),
  allDocs: (opts:any)=> db.allDocs(opts),
  all: (opts:any)=> db.allDocs({include_docs:true, ...opts}),
  async syncWithServer(){
    // mock sync: in real usage replicate with CouchDB instance
    // e.g. return db.replicate.to('https://couchdb.example.com/pos_db')
    return new Promise((res)=> setTimeout(res,500))
  }
}

export default api
