<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nhắc nhở lịch hẹn ngày mai</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: white; }
        .appointment-box { background: #fff5f5; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #ff6b35; }
        .urgent-reminder { background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #ffc107; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .contact-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⏰ Nhắc nhở: Lịch hẹn ngày mai!</h1>
        </div>
        
        <div class="content">
            <h2>Xin chào {{ $patientName }},</h2>
            
            <p>Đây là lời nhắc nhở về lịch hẹn khám bệnh của bạn vào <strong>ngày mai</strong>.</p>
            
            <div class="appointment-box">
                <h3>📋 Thông tin lịch hẹn ngày mai</h3>
                <p><strong>👨‍⚕️ Bác sĩ:</strong> {{ $doctorName }}</p>
                <p><strong>🏥 Chuyên khoa:</strong> {{ $specialty }}</p>
                <p><strong>📅 Ngày khám:</strong> <span style="color: #ff6b35; font-weight: bold;">{{ $appointmentDate }}</span></p>
                <p><strong>🕐 Giờ khám:</strong> <span style="color: #ff6b35; font-weight: bold;">{{ $appointmentTime }}</span></p>
                <p><strong>📝 Lý do khám:</strong> {{ $reason }}</p>
                <p><strong>💰 Chi phí khám:</strong> {{ $consultationFee }} VNĐ</p>
            </div>
            
            <div class="urgent-reminder">
                <h4>⚠️ Lưu ý quan trọng cho ngày mai:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>⏰ Có mặt lúc:</strong> {{ date('H:i', strtotime($appointmentTime) - 900) }} (trước 15 phút)</li>
                    <li><strong>🚗 Lưu ý giao thông:</strong> Tính toán thời gian di chuyển</li>
                    <li><strong>☂️ Thời tiết:</strong> Kiểm tra dự báo thời tiết</li>
                    <li><strong>💊 Nhịn ăn:</strong> Kiểm tra có cần nhịn ăn không</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h4>📞 Cần hỗ trợ?</h4>
                <p><strong>Hotline:</strong> 1900-xxxx</p>
                <p><strong>Email:</strong> support@hospital.com</p>
                <p><strong>Hủy/Đổi lịch:</strong> Liên hệ trước 2 tiếng</p>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666; font-style: italic;">
                Vui lòng đăng nhập hệ thống để xem thông tin chi tiết
            </p>
        </div>
        
        <div class="footer">
            <p>🏥 <strong>Hệ thống đặt lịch khám bệnh</strong></p>
            <p>Chúc bạn có buổi khám thành công!</p>
        </div>
    </div>
</body>
</html> 