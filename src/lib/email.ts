import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export default resend

/**
 * Send email helper function
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param react - React email component
 * @returns Promise with send result
 */
export async function sendEmail(
  to: string | string[],
  subject: string,
  react: React.ReactElement
) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'BitBuy <noreply@bitbuy.com>',
      to,
      subject,
      react,
    })

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
