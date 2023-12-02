import { connectDatabase, insertDocument } from '../auth/user'


export default async function handler(req, res) {
    const event = req.query.eventID
    let client;
    try {
        client = await connectDatabase('sabamitagvaria', 'sabaana0307')
    } catch (e) {
        res.status(500).json({ message: "Could not connect to database." })
    }
    if (req.method === 'POST') {
        const { email, name, text } = req.body
        if (
            !email.includes('@') ||
            email.trim() == '' ||
            name.trim() == '' ||
            text.trim() == '') {
            res.status(401).json({ message: 'Invalid inputs.' })
            return
        }
        const commentData = { event, commentId: new Date().toISOString(), ...req.body }
        try {
            await insertDocument(client, 'events', 'comments', { comment: commentData })
            res.status(201).json({ status: 'success', title: "Success", message: "Comment has been added.", comment: commentData })
        } catch (e) {
            res.status(500).json({ status: "error", title: "Error", message: "Could not store comment to database." })
        } finally {
            client.close()
        }


    } else if (req.method === 'GET') {
        let commentsDefaultStructure;
        try {
            const db = client.db('events')
            commentsDefaultStructure = await db
                .collection('comments')
                .find({ "comment.event": event })
                .sort({ _id: -1 })
                .toArray()
            res.status(201).json({
                message: "comments has been fetched",
                comments: commentsDefaultStructure.map(o => o.comment)
            })
        } catch (e) {
            res.status(500).json({ message: "Could not fetch data from database." })
        } finally {
            client.close()
        }
    }
}