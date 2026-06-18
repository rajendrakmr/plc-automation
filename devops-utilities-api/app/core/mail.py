import logging
from datetime import date
from typing import Optional

from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

from app.core.config import settings

logger = logging.getLogger(__name__)

conf = ConnectionConfig(
    MAIL_USERNAME=settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=settings.mail_port,
    MAIL_SERVER=settings.mail_server,
    MAIL_FROM_NAME=settings.mail_from_name,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


# ─────────────────────────────────────────────────────────────────────────────
# Customer confirmation email
# ─────────────────────────────────────────────────────────────────────────────

def customer_email_html(
    name: str,
    part_no: str,
    category: str,
    email: str,
    phone: str,
    message: str,
) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Enquiry Confirmation – PLC Automation Group</title>
  <style>
    body {{ font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }}
    .wrapper {{ max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }}
    .header {{ background: #1a2c4e; padding: 24px 32px; }}
    .header h1 {{ color: #fff; margin: 0; font-size: 22px; }}
    .header p {{ color: #a8bdd8; margin: 4px 0 0; font-size: 13px; }}
    .body {{ padding: 32px; }}
    .greeting {{ font-size: 22px; font-weight: 700; color: #1a2c4e; margin-bottom: 8px; }}
    .info-text {{ color: #e87722; font-size: 13px; margin: 8px 0 24px; }}
    .summary-title {{ font-size: 15px; font-weight: 600; color: #1a2c4e; margin-bottom: 12px; }}
    .table {{ width: 100%; border-collapse: collapse; margin-bottom: 24px; }}
    .table td {{ padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f0f0f0; }}
    .table td:first-child {{ color: #9ca3af; font-weight: 600; width: 40%; }}
    .table td:last-child {{ color: #1a2c4e; }}
    .message-box {{ background: #f8fafc; border-left: 3px solid #1a2c4e; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #374151; margin-bottom: 24px; line-height: 1.6; }}
    .contact-section {{ background: #f8fafc; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; }}
    .contact-section h3 {{ margin: 0 0 8px; font-size: 15px; color: #1a2c4e; }}
    .contact-section p {{ margin: 4px 0; font-size: 13px; color: #6b7280; }}
    .contact-section a {{ color: #e87722; text-decoration: none; }}
    .features p {{ font-size: 14px; font-weight: 600; color: #1a2c4e; margin-bottom: 8px; }}
    .feature-item {{ font-size: 13px; color: #374151; margin-bottom: 6px; }}
    .footer {{ background: #f8fafc; padding: 16px 32px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e8eaed; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>PLC Automation Group</h1>
      <p>Industrial Automation Parts Supplier</p>
    </div>
    <div class="body">
      <p class="greeting">Hello {name},</p>
      <p style="font-size:14px;color:#1a2c4e;font-weight:600;margin:0 0 6px;">
        Thank you for enquiring with PLC Automation Group.
      </p>
      <p class="info-text">
        Our team has received your enquiry and is working hard to get you a competitive quote.
      </p>

      <p class="summary-title">Here's a summary of your enquiry:</p>
      <table class="table">
        <tr><td>Part Number:</td><td>{part_no or "—"}</td></tr>
        <tr><td>Manufacturer:</td><td>{category or "—"}</td></tr>
        <tr><td>Name:</td><td>{name}</td></tr>
        <tr><td>Email:</td><td>{email}</td></tr>
        <tr><td>Phone:</td><td>{phone or "—"}</td></tr>
        <tr><td>Date:</td><td>{date.today().strftime("%d %b %Y")}</td></tr>
      </table>

      <p class="summary-title">Your Message:</p>
      <div class="message-box">{message}</div>

      <div class="contact-section">
        <h3>Need to modify your request or enquire about a different part?</h3>
        <p>📞 Call us at <a href="tel:+61421000214">+61 421 000 214</a></p>
        <p>📧 Email us at <a href="mailto:sales@plcautomat.com">sales@plcautomat.com</a></p>
      </div>

      <div class="features">
        <p>Why Choose PLC Automation Group?</p>
        <div class="feature-item">✅ Global Delivery</div>
        <div class="feature-item">✅ 12 Months Warranty</div>
        <div class="feature-item">✅ 100% Authentic Parts</div>
        <div class="feature-item">✅ Quick Dispatch</div>
        <div class="feature-item">✅ 24/7 Customer Support</div>
        <div class="feature-item">✅ Hassle-Free Returns</div>
      </div>
    </div>
    <div class="footer">
      &copy; {date.today().year} PLC Automation Group. All rights reserved.<br/>
      Singapore | Australia | India<br/><br/>
      <!-- ANTI-SPAM: physical address is required by CAN-SPAM / CASL -->
      123 Automation Street, Sydney NSW 2000, Australia<br/>
      You received this email because you submitted an enquiry on our website.
      <!-- Add unsubscribe link here if you send marketing emails -->
    </div>
  </div>
</body>
</html>"""


# ─────────────────────────────────────────────────────────────────────────────
# Admin notification email
# ─────────────────────────────────────────────────────────────────────────────

def admin_email_html(
    name: str,
    part_no: str,
    category: str,
    email: str,
    phone: str,
    message: str,
    ip: str = "",
) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>New Enquiry – PLC Automation Group</title>
  <style>
    body {{ font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }}
    .wrapper {{ max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }}
    .header {{ background: #1a2c4e; padding: 20px 32px; }}
    .header h1 {{ color: #fff; margin: 0; font-size: 18px; }}
    .badge {{ display: inline-block; background: #e87722; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; margin-top: 6px; }}
    .body {{ padding: 28px 32px; }}
    .table {{ width: 100%; border-collapse: collapse; }}
    .table tr:nth-child(even) {{ background: #f8fafc; }}
    .table td {{ padding: 12px 14px; font-size: 13px; border-bottom: 1px solid #f0f0f0; }}
    .table td:first-child {{ color: #9ca3af; font-weight: 600; width: 35%; }}
    .table td:last-child {{ color: #1a2c4e; font-weight: 500; }}
    .message-box {{ background: #f8fafc; border-left: 3px solid #e87722; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #374151; margin-top: 20px; line-height: 1.6; }}
    .footer {{ background: #f8fafc; padding: 14px 32px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e8eaed; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <span class="badge">ACTION REQUIRED</span>
    </div>
    <div class="body">
      <table class="table">
        <tr><td>Name:</td><td>{name}</td></tr>
        <tr><td>Part Number:</td><td>{part_no or "—"}</td></tr>
        <tr><td>Manufacturer:</td><td>{category or "—"}</td></tr>
        <tr><td>Email:</td><td><a href="mailto:{email}">{email}</a></td></tr>
        <tr><td>Phone:</td><td>{phone or "—"}</td></tr>
        <tr><td>Date:</td><td>{date.today().strftime("%d %b %Y")}</td></tr>
        <tr><td>IP Address:</td><td>{ip or "—"}</td></tr>
      </table>
      <div class="message-box">
        <strong>Message:</strong><br/><br/>
        {message}
      </div>
    </div>
    <div class="footer">
      PLC Automation Group — Internal Notification. Do not reply.
    </div>
  </div>
</body>
</html>"""


# ─────────────────────────────────────────────────────────────────────────────
# Send both emails
# ─────────────────────────────────────────────────────────────────────────────

async def send_contact_emails(
    name: str,
    email: str,
    phone: str,
    message: str,
    part_no: Optional[str] = "",
    category: Optional[str] = "",
    ip: Optional[str] = "",
) -> None:
    fm = FastMail(conf)

    try: 
        await fm.send_message(
            MessageSchema(
                subject=f"New Enquiry: {part_no or 'General'} from {name}",
                recipients=[settings.mail_from],
                body=admin_email_html(name, part_no, category, email, phone, message, ip),
                subtype=MessageType.html,
                headers={ 
                    "X-Auto-Response-Suppress": "OOF, AutoReply",
                    "Precedence": "bulk",
                },
            )
        )
        logger.info("Admin notification sent for enquiry from %s <%s>", name, email)

    except Exception as exc: 
        logger.error("Failed to send admin notification: %s", exc, exc_info=True)

    try:
        # ── 2. Customer confirmation ──────────────────────────────────────────
        await fm.send_message(
            MessageSchema(
                subject="We received your enquiry — PLC Automation Group",
                recipients=[email],
                body=customer_email_html(name, part_no, category, email, phone, message),
                subtype=MessageType.html,
                headers={ 
                    "Reply-To": settings.mail_from, 
                    "X-Mailer": "PLC-Automation-Mailer/1.0", 
                    "Precedence": "transactional",  
                    "X-Auto-Response-Suppress": "OOF, AutoReply", 
                    "X-Notifications": "true",
                },
            )
        )
        logger.info("Confirmation email sent to %s", email)

    except Exception as exc:
        logger.error("Failed to send customer confirmation to %s: %s", email, exc, exc_info=True)