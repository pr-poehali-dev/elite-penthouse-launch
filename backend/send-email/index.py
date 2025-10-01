import json
import smtplib
import os
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form data to recipient email
    Args: event with httpMethod, body containing form data
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    city = body_data.get('city', '')
    comment = body_data.get('comment', '')
    
    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_port_str = os.environ.get('SMTP_PORT', '587')
    try:
        smtp_port = int(smtp_port_str)
    except (ValueError, TypeError):
        smtp_port = 587
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient_email = os.environ.get('RECIPIENT_EMAIL', '')
    telegram_bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    
    city_name = 'Москва' if city == 'moscow' else 'Санкт-Петербург'
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта пентхаусов от {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    html_content = f'''
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            Новая заявка с сайта
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Имя:</strong> {name}</p>
            <p style="margin: 10px 0;"><strong>Телефон:</strong> {phone}</p>
            <p style="margin: 10px 0;"><strong>Город:</strong> {city_name}</p>
            {f'<p style="margin: 10px 0;"><strong>Комментарий:</strong> {comment}</p>' if comment else ''}
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
            <p>Это автоматическое письмо с сайта премиум-пентхаусов.</p>
          </div>
        </div>
      </body>
    </html>
    '''
    
    html_part = MIMEText(html_content, 'html')
    msg.attach(html_part)
    
    email_sent = False
    telegram_sent = False
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        email_sent = True
    except Exception as e:
        pass
    
    if telegram_bot_token and telegram_chat_id:
        telegram_message = f'''🏢 *Новая заявка с сайта пентхаусов*

👤 *Имя:* {name}
📞 *Телефон:* {phone}
🌆 *Город:* {city_name}'''
        
        if comment:
            telegram_message += f'\n💬 *Комментарий:* {comment}'
        
        try:
            requests.post(
                f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage',
                json={
                    'chat_id': telegram_chat_id,
                    'text': telegram_message,
                    'parse_mode': 'Markdown'
                },
                timeout=5
            )
            telegram_sent = True
        except Exception as e:
            pass
    
    if email_sent or telegram_sent:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Notification sent successfully'})
        }
    else:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Failed to send notifications'})
        }