# qh.studio website

Website của qh.studio (Next.js 16, App Router, Tailwind v4, next-intl). Gồm 5 trang, mỗi trang có hai bản `/vi` và `/en`: Trang chủ, Dự án, Dịch vụ, Giới thiệu, Liên hệ.

## Chạy local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # kiểm tra build production
```

Video `.mp4` không được commit vào git. Khi chạy local, chép file vào `public/work/` (đặt tên theo `slug`). Ảnh poster `.jpg` thì được commit.

## Sửa nội dung

| Nội dung | File |
|---|---|
| Toàn bộ chữ trên site (VI / EN) | [messages/vi.json](messages/vi.json), [messages/en.json](messages/en.json) |
| Dự án, video, dự án tiêu biểu, tên khách hàng | [src/content/work.ts](src/content/work.ts) |
| Email, điện thoại, Zalo, Messenger, WhatsApp | [src/content/site.ts](src/content/site.ts) |
| Showreel trang chủ (`public/work/showreel.mp4` + `.jpg`, 16:9) | `showreel` trong [src/content/work.ts](src/content/work.ts) |

Kênh liên hệ nào để trống thì sẽ tự ẩn khỏi trang Liên hệ, footer và nút chat nổi. Bản VI ưu tiên Zalo/Messenger, bản EN ưu tiên Email/WhatsApp.

## Tự chọn ngôn ngữ

[src/proxy.ts](src/proxy.ts) xử lý theo thứ tự sau:

1. Nếu khách đã từng tự chọn ngôn ngữ (cookie `NEXT_LOCALE`), dùng lựa chọn đó.
2. Nếu có header quốc gia (`x-vercel-ip-country` trên Vercel, `cf-ipcountry` trên Cloudflare): IP ở Việt Nam vào `/vi`, các nước khác vào `/en`.
3. Nếu không có header quốc gia, dùng ngôn ngữ của trình duyệt (Accept-Language), mặc định là `/en`.

Header quốc gia chỉ có khi deploy trên Vercel hoặc đi qua Cloudflare.

## Biến môi trường

Xem [.env.example](.env.example).

- `NEXT_PUBLIC_SITE_URL`: domain chính thức, dùng cho canonical, sitemap và Open Graph.
- `NEXT_PUBLIC_VIDEO_BASE_URL`: thư mục chứa `<slug>.mp4`. Để trống thì video lấy từ `/work` (local).

## Đưa video lên Azure Blob Storage (gói Azure for Students)

```bash
az provider register -n Microsoft.Storage --wait
az group create -n qhstudio-rg -l southeastasia
az storage account create -n qhstudiomedia -g qhstudio-rg -l southeastasia \
  --sku Standard_LRS --kind StorageV2 --allow-blob-public-access true --min-tls-version TLS1_2
az storage container create --account-name qhstudiomedia -n work --public-access blob --auth-mode key
az storage blob upload-batch --account-name qhstudiomedia -d work -s public/work --pattern "*.mp4" \
  --content-cache-control "public, max-age=31536000, immutable" --auth-mode key
```

Sau đó đặt `NEXT_PUBLIC_VIDEO_BASE_URL=https://qhstudiomedia.blob.core.windows.net/work`. Nếu tên `qhstudiomedia` đã có người dùng, đổi sang tên khác (chữ thường, từ 3 đến 24 ký tự).
