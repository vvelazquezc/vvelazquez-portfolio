import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_LABELS: Record<string, string> = {
  job: "Oportunidad laboral / Job opportunity",
  freelance: "Proyecto freelance / Freelance project",
  collab: "Colaboración / Collaboration",
  other: "Otro / Other",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "veronicavelazquezcalleja@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subjectLabel} - de ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head><meta charset="UTF-8" /></head>
          <body style="font-family: 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 32px 16px;">
            <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7;">
              <!-- Header -->
              <div style="background: #1a1a2e; padding: 24px 32px;">
                <p style="margin: 0; font-family: monospace; font-size: 12px; color: #9d7cd8;">$ curl -X POST ~/contact</p>
                <h1 style="margin: 8px 0 0; font-size: 20px; color: #ffffff;">Nuevo mensaje desde el portfolio</h1>
              </div>
              <!-- Body -->
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; width: 120px;">
                      <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Nombre</span>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
                      <span style="font-size: 14px; color: #18181b;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
                      <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
                      <a href="mailto:${email}" style="font-size: 14px; color: #7c3aed; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
                      <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Asunto</span>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5;">
                      <span style="font-size: 14px; color: #18181b;">${subjectLabel}</span>
                    </td>
                  </tr>
                </table>
                <!-- Message -->
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Mensaje</p>
                <div style="background: #f4f4f5; border-radius: 6px; padding: 16px; font-size: 14px; color: #18181b; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              <!-- Footer -->
              <div style="padding: 16px 32px; border-top: 1px solid #f4f4f5; background: #fafafa;">
                <p style="margin: 0; font-size: 12px; color: #a1a1aa; font-family: monospace;">veronicavelazquez.dev — portfolio contact form</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Failed to send email:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
