import type { Locale } from "@/i18n/routing";

// Production builds fall back to the live domain and video storage, so a deploy works without env vars.
const isProd = process.env.NODE_ENV === "production";

// Studio contact details. Leave a channel empty to hide it everywhere on the site.
export const site = {
  name: "qh.studio",
  url: (process.env.NEXT_PUBLIC_SITE_URL || (isProd ? "https://www.qhstudio.io.vn" : "http://localhost:3000")).replace(/\/$/, ""),
  email: "qhstudio.work@gmail.com",
  phone: "+84 333 512 771",
  zalo: "", // e.g. https://zalo.me/84333512771
  messenger: "", // e.g. https://m.me/qhstudio
  whatsapp: "", // e.g. https://wa.me/84333512771
};

export type ChannelId = "email" | "phone" | "zalo" | "messenger" | "whatsapp";

const channelHref: Record<ChannelId, string> = {
  email: site.email && `mailto:${site.email}`,
  phone: site.phone && `tel:${site.phone.replace(/\s/g, "")}`,
  zalo: site.zalo,
  messenger: site.messenger,
  whatsapp: site.whatsapp,
};

const channelValue: Record<ChannelId, string> = {
  email: site.email,
  phone: site.phone,
  zalo: site.phone,
  messenger: site.messenger.replace(/^https?:\/\//, ""),
  whatsapp: site.phone,
};

// Vietnamese visitors reach for Zalo/Messenger first; international visitors for email/WhatsApp.
const channelOrder: Record<Locale, ChannelId[]> = {
  vi: ["zalo", "messenger", "phone", "email"],
  en: ["email", "whatsapp", "messenger", "phone"],
};

export function getChannels(locale: Locale) {
  return channelOrder[locale]
    .filter((id) => channelHref[id])
    .map((id) => ({ id, href: channelHref[id], value: channelValue[id] }));
}

// Floating chat button: the first instant-messaging channel configured for the locale.
export function getChatChannel(locale: Locale) {
  return getChannels(locale).find((channel) => channel.id === "zalo" || channel.id === "messenger" || channel.id === "whatsapp");
}

const videoBase = (
  process.env.NEXT_PUBLIC_VIDEO_BASE_URL || (isProd ? "https://qhstudiomedia.blob.core.windows.net/work" : "/work")
).replace(/\/$/, "");

export const videoSrc = (slug: string) => `${videoBase}/${slug}.mp4`;
export const posterSrc = (slug: string) => `/work/${slug}.jpg`;
