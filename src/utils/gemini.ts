export interface GeminiResponse {
    candidates: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
}

export const callGeminiAPI = async (
    prompt: string,
    apiKey: string,
    context: string
): Promise<string> => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: `You are an AI assistant for Aminul Islam Bhuiyan Amin's portfolio. 
            Use the following context about Aminul to answer questions. 
            If the answer isn't in the context, say you don't know but suggest checking the Resume or Contact section. 
            Keep answers concise and professional.
            
            CONTEXT:
            ${JSON.stringify(context)}
            
            USER QUESTION:
            ${prompt}`,
                    },
                ],
            },
        ],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to call Gemini API');
        }

        const data: GeminiResponse = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};
