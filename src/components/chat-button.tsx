import { getLocale, getTranslations } from "next-intl/server";
import { getChatChannel } from "@/content/site";

// Floating shortcut to Zalo/Messenger (vi) or WhatsApp/Messenger (en). Hidden until a channel is configured.
export async function ChatButton() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
  const channel = getChatChannel(locale);
  if (!channel) return null;

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper shadow-lg transition-transform hover:-translate-y-0.5"
    >
      {t("chat")} · {t(`contact.channels.${channel.id}`)}
    </a>
  );
}
