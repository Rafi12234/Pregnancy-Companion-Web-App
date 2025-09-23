import { Router } from 'express';

// Node 18+ has global fetch available
const router = Router();

// simple emergency guardrail (non-medical triage)
const EMERGENCY_TERMS = [
  'heavy bleeding', 'severe bleeding', 'severe pain', 'no fetal movement',
  'no baby movement', 'fainting', 'seizure', 'pre-eclampsia', 'preeclampsia',
  'vision changes', 'severe headache', 'labor before 37 weeks', 'shortness of breath'
];

function looksEmergency(q) {
  const t = (q || '').toLowerCase();
  return EMERGENCY_TERMS.some(k => t.includes(k));
}

// PUBLIC: POST /api/ai/ask
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body || {};
    if (!question) return res.status(400).json({ message: 'question is required' });

    if (looksEmergency(question)) {
      return res.json({
        answer:
`⚠️ This could be urgent.
Please seek medical care immediately or call your local emergency number.
If you have a maternity/obstetric helpline, call them now.`
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'GEMINI_API_KEY not configured on server' });
    }

    const systemPreamble = `
You are a kind, concise pregnancy information assistant for general education only.
You are NOT a doctor and you do not give medical diagnoses.
Encourage users to contact their clinician for personal medical advice.
If symptoms could be serious, advise them to seek urgent care.
Use simple, culturally neutral language. Prefer bullet points and short steps.
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        { role: "user", parts: [{ text: systemPreamble + "\nUser question: " + question }] }
      ],
      generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
      safetySettings: []
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(500).json({ message: 'Gemini API error', detail });
    }

    const json = await r.json();
    const answer = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || "Sorry, I couldn’t generate a response.";
    return res.json({ answer });
  } catch (err) {
    console.error('AI /ask error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
