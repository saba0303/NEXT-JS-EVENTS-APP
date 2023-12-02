const { MongoClient } = require('mongodb')
export async function connectDatabase(clientArg, password) {
    const client = await MongoClient.connect(`mongodb+srv://${clientArg}:${password}@cluster01.r4g64bx.mongodb.net/?retryWrites=true&w=majority`)
    return client
}
export async function insertDocument(client, database, collection, document) {
    const db = client.db(database)
    return await db.collection(collection).insertOne(document)
}
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const user = req.body.user
        let client;
        try {
            client = await connectDatabase('sabamitagvaria', 'sabaana0307')
        } catch (e) {
            res.status(500).json({ status: "error", title: "Failed", message: "Could not connect to database." })
        }
        try {
            insertDocument(client, 'users', 'emails', { email: user })
            res.status(201).json({ status: 'success', title: 'Success', message: "User Has Been Added!" })
        } catch (e) {
            res.status(500).json({ status: "error", title: "Failed", message: "Could not store user's email." })
        } finally {
            client.close()
        }

    }
}
export default handler 