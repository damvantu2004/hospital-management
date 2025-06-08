<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Đặt lịch hẹn thành công</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #28a745; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: white; }
        .appointment-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #28a745; }
        .status-pending { background: #fff3cd; color: #856404; padding: 8px 12px; border-radius: 4px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Đặt lịch hẹn thành công!</h1>
        </div>
        
        <div class="content">
            <h2>Xin chào {{ $patientName }},</h2>
            
            <p>Cảm ơn bạn đã đặt lịch hẹn. Yêu cầu của bạn đã được ghi nhận và <strong>đang chờ bác sĩ xác nhận</strong>.</p>
            
            <div class="appointment-box">
                <h3>📋 Thông tin lịch hẹn</h3>
                <p><strong>👨‍⚕️ Bác sĩ:</strong> {{ $doctorName }}</p>
                <p><strong>🏥 Chuyên khoa:</strong> {{ $specialty }}</p>
                <p><strong>📅 Ngày khám:</strong> {{ $appointmentDate }}</p>
                <p><strong>🕐 Giờ khám:</strong> {{ $appointmentTime }}</p>
                <p><strong>📝 Lý do khám:</strong> {{ $reason }}</p>
                <p><strong>💰 Chi phí dự kiến:</strong> {{ $consultationFee }} VNĐ</p>
                <p><strong>📊 Trạng thái:</strong> <span class="status-pending">⏳ Chờ xác nhận</span></p>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4>📢 Thông tin quan trọng:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Bác sĩ sẽ xác nhận lịch hẹn trong vòng 24 giờ</li>
                    <li>Bạn sẽ nhận được email thông báo khi được xác nhận</li>
                    <li>Nếu cần thay đổi, vui lòng liên hệ trước 2 tiếng</li>
                </ul>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
                Đăng nhập vào hệ thống để xem chi tiết lịch hẹn của bạn
            </p>
        </div>
        
        <div class="footer">
            <p>🏥 <strong>Hệ thống đặt lịch khám bệnh</strong></p>
            <p>Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi!</p>
        </div>
    </div>
</body>
</html> 