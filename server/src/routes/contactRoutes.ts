import express, { Request, Response, Router } from 'express';
import Contact from '../models/Contact';

const router: Router = express.Router();

// 1. POST: Submit a new message from the portfolio form
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Actually save it to your MongoDB cluster
    const newContact = await Contact.create({ name, email, subject, message });

    return res.status(200).json({ success: true, data: newContact });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// 2. GET: Fetch all messages for your Admin Control Panel
// Tip: Add your protect/auth middleware here later! (e.g., router.get('/', protect, async...))
router.get('/', async (req: Request, res: Response) => {
  try {
    // Sort by newest entries first
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// 3. DELETE: Drop message records by ID from your Admin Panel
router.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message index block not found.' });
    }

    return res.status(200).json({ success: true, message: 'Message dropped from cluster.' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;