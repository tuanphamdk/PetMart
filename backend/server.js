const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = { orders: [], bookings: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Kiểm tra server hoạt động
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'PetMart backend is running' });
});

// Lấy toàn bộ đơn hàng và lịch dịch vụ
app.get('/api/history', (req, res) => {
  try {
    const db = readDb();
    res.json(db);
  } catch (err) {
    res.status(500).json({ error: 'Không đọc được dữ liệu lịch sử.' });
  }
});

// Tạo đơn hàng mới
app.post('/api/orders', (req, res) => {
  try {
    const { fullName, phone, deliveryMethod, address, note, items, totalPrice } = req.body;

    if (!fullName || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Thiếu thông tin người nhận, số điện thoại hoặc giỏ hàng.' });
    }

    const db = readDb();
    const newOrder = {
      id: 'ORD-' + Date.now(),
      createdAt: new Date().toLocaleString('vi-VN'),
      fullName: fullName.trim(),
      phone: phone.trim(),
      deliveryMethod: deliveryMethod === 'pickup' ? 'pickup' : 'delivery',
      address: deliveryMethod === 'pickup'
        ? '124 Trần Duy Hưng, Cầu Giấy, Hà Nội (Tự đến lấy)'
        : (address || '').trim(),
      note: (note || '').trim(),
      items,
      totalPrice: Number(totalPrice) || 0,
      status: 'Đã ghi nhận',
    };

    db.orders.unshift(newOrder);
    writeDb(db);

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu đơn hàng.' });
  }
});

// Tạo lịch hẹn dịch vụ mới
app.post('/api/bookings', (req, res) => {
  try {
    const { ownerName, phone, petType, weightRange, serviceId, serviceName, date, timeSlot, note } = req.body;

    if (!ownerName || !phone || !date) {
      return res.status(400).json({ error: 'Thiếu tên, số điện thoại hoặc ngày hẹn.' });
    }

    const db = readDb();
    const newBooking = {
      id: 'BK-' + Date.now(),
      createdAt: new Date().toLocaleString('vi-VN'),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      petType: petType || 'Chó',
      weightRange: weightRange || 'Dưới 5 kg',
      serviceId: serviceId || 'standard',
      serviceName: serviceName || 'Gói dịch vụ chăm sóc',
      date,
      timeSlot: timeSlot || '09:30',
      note: (note || '').trim(),
      status: 'Đã đặt lịch',
    };

    db.bookings.unshift(newBooking);
    writeDb(db);

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu lịch đặt dịch vụ.' });
  }
});

// Xóa 1 đơn hàng hoặc 1 lịch hẹn (tuỳ chọn để dọn test)
app.delete('/api/orders/:id', (req, res) => {
  const db = readDb();
  db.orders = db.orders.filter((o) => o.id !== req.params.id);
  writeDb(db);
  res.json({ ok: true });
});

app.delete('/api/bookings/:id', (req, res) => {
  const db = readDb();
  db.bookings = db.bookings.filter((b) => b.id !== req.params.id);
  writeDb(db);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Backend đang chạy tại http://localhost:${PORT}`);
});