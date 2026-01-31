import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const portfolioUrl = "https://portfolio-delta-steel-61.vercel.app";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
        return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Satpal Singh – Portfolio <onboarding@resend.dev>',
            to: ['pcsatpals@gmail.com'],
            subject: 'New Contact Form Message',
            replyTo: email,
            // Pass the component directly - Resend handles rendering
            html: `
            <div>
            <h1>New Portfolio Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Portfolio URL:</strong> <a href=${portfolioUrl}>${portfolioUrl}</a></p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
        </div>`,
        });

        if (error) {
            return Response.json({
                html: "<h1>Getting Error:</h1>",
                error
            }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error)
        return Response.json({ error }, { status: 500 });
    }
}