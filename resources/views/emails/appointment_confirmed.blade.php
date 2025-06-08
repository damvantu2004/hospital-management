<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bác sĩ đã xác nhận lịch hẹn</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: white; }
        .appointment-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #007bff; }
        .status-confirmed { background: #d4edda; color: #155724; padding: 8px 12px; border-radius: 4px; font-weight: bold; }
        .checklist { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏥 Lịch hẹn đã được xác nhận!</h1>
        </div>
        
        <div class="content">
            <h2>Xin chào {{ $patientName }},</h2>
            
            <p>Tin tốt! Bác sĩ <strong>{{ $doctorName }}</strong> đã xác nhận lịch hẹn của bạn.</p>
            
            <div class="appointment-box">
                <h3>📋 Chi tiết lịch hẹn đã xác nhận</h3>
                <p><strong>👨‍⚕️ Bác sĩ:</strong> {{ $doctorName }}</p>
                <p><strong>🏥 Chuyên khoa:</strong> {{ $specialty }}</p>
                <p><strong>📅 Ngày khám:</strong> {{ $appointmentDate }}</p>
                <p><strong>🕐 Giờ khám:</strong> {{ $appointmentTime }}</p>
                <p><strong>📝 Lý do khám:</strong> {{ $reason }}</p>
                @if($notes)
                <p><strong>💬 Lời nhắn từ bác sĩ:</strong> {{ $notes }}</p>
                @endif
                <p><strong>💰 Chi phí khám:</strong> {{ $consultationFee }} VNĐ</p>
                <p><strong>📊 Trạng thái:</strong> <span class="status-confirmed">✅ Đã xác nhận</span></p>
            </div>
            
            <div class="checklist">
                <h4>📝 Checklist chuẩn bị khám:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>⏰ Thời gian:</strong> Có mặt trước 15 phút</li>
                    <li><strong>🆔 Giấy tờ:</strong> CMND/CCCD + thẻ BHYT (nếu có)</li>
                    <li><strong>📄 Hồ sơ:</strong> Kết quả xét nghiệm gần nhất</li>
                    <li><strong>💊 Thuốc:</strong> Danh sách thuốc đang dùng</li>
                    <li><strong>💰 Thanh toán:</strong> Chuẩn bị {{ $consultationFee }} VNĐ</li>
                </ul>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
                Đăng nhập vào hệ thống để theo dõi lịch hẹn của bạn
            </p>
        </div>
        
        <div class="footer">
            <p>🏥 <strong>Hệ thống đặt lịch khám bệnh</strong></p>
            <p>Chúc bạn có buổi khám hiệu quả!</p>
        </div>
    </div>
</body>
</html> 