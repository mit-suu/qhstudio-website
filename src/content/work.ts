import type { Locale } from "@/i18n/routing";

// Portfolio data. Video files live at videoSrc(slug) / posterSrc(slug) (see site.ts).

type Localized = Record<Locale, string>;

export type Category = "short-form" | "long-form" | "ads" | "motion";

export const categories: Category[] = ["short-form", "long-form", "ads", "motion"];

type VideoData = {
  slug: string;
  title: Localized | string;
  tag: Localized | string;
  orientation?: "vertical" | "horizontal";
};

type WorkGroupData = {
  id: string;
  category: Category;
  title: Localized | string;
  meta: Localized;
  description: Localized;
  link?: { label: Localized | string; href: string };
  videos: VideoData[];
};

const clientReel: Localized = { en: "Client reel", vi: "Reel khách hàng" };

const workData: WorkGroupData[] = [
  {
    id: "car-planet-uk",
    category: "short-form",
    title: "Car Planet UK",
    meta: { en: "Client · Instagram Reels · 2026", vi: "Khách hàng · Instagram Reels · 2026" },
    description: {
      en: "Short-form Reels for a UK car dealer, built to showcase vehicles with quick, social-first edits.",
      vi: "Reels ngắn cho đại lý xe tại Anh, giới thiệu xe bằng nhịp dựng nhanh, tối ưu cho mạng xã hội.",
    },
    link: { label: { en: "@carplanetuk on Instagram", vi: "@carplanetuk trên Instagram" }, href: "https://www.instagram.com/carplanetuk/" },
    videos: ["01", "02", "03", "04", "05", "06"].map((n) => ({
      slug: `carplanet-${n}`,
      title: `Car Planet ${n}`,
      tag: clientReel,
    })),
  },
  {
    id: "talking-head",
    category: "short-form",
    title: { en: "Talking-head Reels", vi: "Reels talking-head" },
    meta: { en: "Client · via a creative agency · 2026", vi: "Khách hàng · qua agency sáng tạo · 2026" },
    description: {
      en: "Talking-head Reels for business and wellness creators, including Michael Argento and Natasha Zuvela: kinetic captions, animated graphics and B-roll that keep the message moving.",
      vi: "Reels talking-head cho creator lĩnh vực kinh doanh và sức khỏe, gồm Michael Argento và Natasha Zuvela: phụ đề động, đồ họa chuyển động và B-roll giữ nhịp cho thông điệp.",
    },
    videos: [
      { slug: "argento-01", title: { en: "Michael Argento: finances ranked", vi: "Michael Argento: xếp hạng tài chính" }, tag: clientReel },
      { slug: "argento-02", title: { en: "Michael Argento: 7-8-figure finances", vi: "Michael Argento: tài chính 7-8 con số" }, tag: clientReel },
      { slug: "natasha-zuvela-01", title: "Natasha Zuvela", tag: clientReel },
    ],
  },
  {
    id: "creators",
    category: "short-form",
    title: { en: "US creator Reels", vi: "Reels cho creator Mỹ" },
    meta: { en: "Instagram · via a creative agency · 2024 → 2025", vi: "Instagram · qua agency sáng tạo · 2024 → 2025" },
    description: {
      en: "Short-form Reels for creator and coach brands, including Bashiri Smith (207K Instagram followers) and Justin Phan.",
      vi: "Reels ngắn cho thương hiệu creator và coach, gồm Bashiri Smith (207K followers Instagram) và Justin Phan.",
    },
    videos: [
      { slug: "bashi-152", title: "Bashiri Smith", tag: "Reel" },
      { slug: "bashi-156", title: "Bashiri Smith", tag: "Reel" },
      { slug: "justin-biggest-month", title: "Justin Phan", tag: "Video", orientation: "horizontal" },
    ],
  },
  {
    id: "beatframe",
    category: "short-form",
    title: "BeatFrame",
    meta: { en: "YouTube · in-house channel · 2025 → now", vi: "YouTube · kênh nội bộ · 2025 → nay" },
    description: {
      en: "Our English-language rap and music channel, built from zero to 29.2M views and 26K subscribers: ideas, script, editing, voiceover, SFX and captions.",
      vi: "Kênh rap và âm nhạc tiếng Anh do chúng tôi xây dựng từ con số 0 đến 29,2 triệu lượt xem và 26K người đăng ký: ý tưởng, kịch bản, dựng, voice-over, SFX và phụ đề.",
    },
    link: { label: "youtube.com/@Beatframe999", href: "https://www.youtube.com/@Beatframe999" },
    videos: [
      { slug: "beatframe-eminem", title: "Eminem diss", tag: "Short" },
      { slug: "beatframe-kanye", title: "Kanye", tag: "Short" },
      { slug: "beatframe-travis", title: { en: "Travis Scott moment", vi: "Khoảnh khắc Travis Scott" }, tag: "Short" },
      { slug: "beatframe-kanye-taylor", title: "Kanye vs Taylor", tag: "Short" },
      { slug: "beatframe-eminem-mariah", title: "Eminem vs Mariah", tag: "Short" },
      { slug: "beatframe-kendrick-control", title: 'Kendrick: "Control"', tag: "Short" },
    ],
  },
  {
    id: "tiktok-vn",
    category: "short-form",
    title: { en: "Vietnamese TikTok talking-head", vi: "Talking-head TikTok tiếng Việt" },
    meta: { en: "TikTok · Vietnamese · 2026", vi: "TikTok · tiếng Việt · 2026" },
    description: {
      en: "Story-driven talking-head videos in Vietnamese: tight cuts, word-by-word captions, comment pop-ups, B-roll and illustrated cutaways.",
      vi: "Video talking-head kể chuyện bằng tiếng Việt: cắt gọn, phụ đề từng chữ, bình luận pop-up, B-roll và hình minh họa.",
    },
    videos: [
      { slug: "tiktok-chong-no-co-bac", title: { en: "Husband's gambling debt", vi: "Chồng nợ cờ bạc" }, tag: "Talking head" },
    ],
  },
  {
    id: "vlog",
    category: "long-form",
    title: { en: "Lifestyle & travel vlogs", vi: "Vlog đời sống & du lịch" },
    meta: { en: "Long-form · YouTube vlog · 2026", vi: "Video dài · vlog YouTube · 2026" },
    description: {
      en: "Day-in-the-life and travel vlogs: pacing, music and minimal titles that keep a long, casual video easy to watch.",
      vi: "Vlog đời thường và du lịch: nhịp dựng, nhạc và chữ tối giản giúp video dài, tự nhiên vẫn dễ xem.",
    },
    videos: [
      { slug: "canada-vlog", title: { en: "Canada vlog: Toronto", vi: "Vlog Canada: Toronto" }, tag: "Vlog", orientation: "horizontal" },
      { slug: "vlog-edit", title: { en: "Lifestyle vlog", vi: "Vlog đời sống" }, tag: "Vlog", orientation: "horizontal" },
    ],
  },
  {
    id: "ads",
    category: "ads",
    title: { en: "Ads & product shorts", vi: "Quảng cáo & video sản phẩm" },
    meta: { en: "Client · short-form", vi: "Khách hàng · video ngắn" },
    description: {
      en: "Direct-response ads, product shorts and creator reels.",
      vi: "Quảng cáo chuyển đổi trực tiếp, video sản phẩm và reels cho creator.",
    },
    videos: [
      { slug: "jic-duct-cleaning-ad", title: { en: "J.I.C duct cleaning", vi: "J.I.C vệ sinh ống gió" }, tag: "Ad" },
      { slug: "archie-proof-ad", title: { en: "Proof ad", vi: "Quảng cáo proof" }, tag: "Ad" },
      { slug: "archie-lead-form-ad", title: { en: "Lead form ad", vi: "Quảng cáo lead form" }, tag: "Ad" },
      { slug: "nikhil-1", title: "Creator reel", tag: "Reel" },
      { slug: "ryse-gadget", title: { en: "Coolest gadget ever", vi: "Món gadget thú vị nhất" }, tag: { en: "Product", vi: "Sản phẩm" } },
      { slug: "ryse-8k", title: { en: "Someone quote me 8K", vi: "Báo giá tôi 8K" }, tag: { en: "Product", vi: "Sản phẩm" } },
      { slug: "ryse-wait", title: { en: "Wait, don't", vi: "Khoan đã" }, tag: { en: "Product", vi: "Sản phẩm" } },
      { slug: "ryse-cost", title: { en: "Why it costs so much", vi: "Vì sao giá cao" }, tag: { en: "Product", vi: "Sản phẩm" } },
    ],
  },
  {
    id: "cinematic",
    category: "motion",
    title: { en: "Cinematic visuals", vi: "Hình ảnh điện ảnh" },
    meta: { en: "Visual storytelling · 2026", vi: "Kể chuyện bằng hình ảnh · 2026" },
    description: {
      en: "Visual storytelling pieces, from short-form ad hooks to longer cinematic sequences.",
      vi: "Các tác phẩm kể chuyện bằng hình ảnh, từ hook quảng cáo ngắn đến những phân cảnh điện ảnh dài hơn.",
    },
    videos: [
      { slug: "ad-hook-01", title: "Ad hook 01", tag: "Visual" },
      { slug: "ad-hook-02", title: "Ad hook 02", tag: "Visual" },
      { slug: "mwh-16", title: "MWH #16", tag: "Visual" },
      { slug: "mwh-17", title: "MWH #17", tag: "Visual" },
      { slug: "mwh-18", title: "MWH #18", tag: "Visual" },
      { slug: "mwh-19", title: "MWH #19", tag: "Visual" },
    ],
  },
];

// Home hero video: <slug>.mp4 + <slug>.jpg, 16:9. Replace the files to update it;
// set hasSound when the new cut has an audio track so the sound toggle appears.
export const showreel = { slug: "showreel", hasSound: true };

// Second, louder reel shown on the About page (click to play).
export const loudReel = { slug: "reel-fable", hasSound: true };

// Videos in "Selected work" on the home page.
const featuredSlugs = [
  "carplanet-01",
  "argento-01",
  "natasha-zuvela-01",
  "ryse-gadget",
  "bashi-152",
  "beatframe-eminem",
  "carplanet-03",
  "ryse-cost",
];

export const clientNames = [
  "Car Planet UK",
  "Bashiri Smith",
  "Justin Phan",
  "Michael Argento",
  "Natasha Zuvela",
  "Miss Review",
  "J.I.C",
];

export type Video = { slug: string; title: string; tag: string; orientation: "vertical" | "horizontal" };

export type WorkGroup = {
  id: string;
  category: Category;
  title: string;
  meta: string;
  description: string;
  link?: { label: string; href: string };
  videos: Video[];
};

const pick = (value: Localized | string, locale: Locale) => (typeof value === "string" ? value : value[locale]);

const localizeVideo = (video: VideoData, locale: Locale): Video => ({
  slug: video.slug,
  title: pick(video.title, locale),
  tag: pick(video.tag, locale),
  orientation: video.orientation ?? "vertical",
});

export function getWork(locale: Locale): WorkGroup[] {
  return workData.map((group) => ({
    id: group.id,
    category: group.category,
    title: pick(group.title, locale),
    meta: group.meta[locale],
    description: group.description[locale],
    link: group.link && { label: pick(group.link.label, locale), href: group.link.href },
    videos: group.videos.map((video) => localizeVideo(video, locale)),
  }));
}

function findVideos(slugs: string[], locale: Locale) {
  const all = workData.flatMap((group) => group.videos);
  return slugs.flatMap((slug) => {
    const video = all.find((item) => item.slug === slug);
    return video ? [localizeVideo(video, locale)] : [];
  });
}

export const getFeatured = (locale: Locale) => findVideos(featuredSlugs, locale);
