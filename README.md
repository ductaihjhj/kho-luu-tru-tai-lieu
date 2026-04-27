# Nhật Ký Diễn Viên Nhí Số

Bản React + Vite + Tailwind + shadcn-style components, đã tách rõ phần page để sau này dễ cập nhật thêm màn hình mới.

## Chạy project

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Cấu trúc chính

```txt
src/
  App.jsx                         # Root layout + state chung + điều hướng tab
  main.jsx                        # React entry
  index.css                       # Tailwind + animation/theme
  pages/
    HomePage.jsx                  # Trang chủ
    ClassResourcesPage.jsx        # Trang tài liệu của lớp
    ChildResourcesPage.jsx        # Trang tài liệu của bé
    ArchivePage.jsx               # Page dùng chung cho danh sách/lọc/tìm kiếm tài liệu
  components/
    app-components.jsx            # Header, sidebar, modal, card, panel, decorative UI
    ui/                           # Button/Card/Input/Badge/Avatar/Progress kiểu shadcn
  lib/
    utils.js                      # helper cn()
```

## Cách thêm page mới

1. Tạo file mới trong `src/pages`, ví dụ `TeacherPage.jsx`.
2. Import page đó trong `src/App.jsx`.
3. Thêm điều kiện trong hàm `renderPage()` để render page theo tab/menu mong muốn.
4. Nếu cần thêm tab trên thanh trên cùng, sửa mảng `tabs` trong `TopTabs` tại `src/components/app-components.jsx`.

## Ghi chú refactor

- Giao diện pastel/storybook ban đầu được giữ nguyên.
- `App.jsx` không còn chứa toàn bộ UI nữa; file này tập trung vào layout tổng, state dùng chung và xử lý upload/thông báo.
- Các màn hình chính đã nằm trong `src/pages` để dễ nâng cấp riêng từng trang.
- Chức năng upload vẫn cập nhật tài liệu mới vào state và hiển thị lên danh sách.
