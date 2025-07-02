import os
from datetime import datetime
from dotenv import load_dotenv
from payos import PayOS, ItemData, PaymentData

load_dotenv()

client_id = os.environ.get('PAYOS_CLIENT_ID')
api_key = os.environ.get('PAYOS_API_KEY')
checksum_key = os.environ.get('PAYOS_CHECKSUM_KEY')

payOS = PayOS(client_id=client_id, api_key=api_key, checksum_key=checksum_key)
item = ItemData(name="Mì tôm hảo hảo ly", quantity=1, price=2000)
time_now = str(datetime.now().timestamp())
time_now = int(time_now.split(".")[0] + time_now.split(".")[1])
print(type(time_now))
paymentData = PaymentData(orderCode=time_now, amount=item.price, description="Thanh toan don hang",
                          items=[item], cancelUrl="https://www.facebook.com/cat.khanh.le.2024", returnUrl="https://www.facebook.com/Nguyen.Hai.Dang.0407")

paymentLinkData = payOS.createPaymentLink(paymentData=paymentData)
print(paymentLinkData)
# print(paymentLinkData.qrCode)
#
# img = qrcode.make(paymentLinkData.qrCode)
# img.save("pay.png")
# orderId = 11

# paymentLinkInfo = payOS.getPaymentLinkInformation(orderId = orderId)
# print(paymentLinkInfo)
#
# paymentLinkInfo = payOS.cancelPaymentLink(orderId=orderId)
# print(paymentLinkInfo)
