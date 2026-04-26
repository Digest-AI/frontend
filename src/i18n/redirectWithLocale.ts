import { redirect, permanentRedirect } from './navigation';
import { getLocale } from 'next-intl/server';

export async function redirectWithLocale(href: string) {
  const locale = await getLocale();

  return redirect({
    href,
    locale: locale
  });
}

export async function permanentRedirectWithLocale(href: string) {
  const locale = await getLocale();

  return permanentRedirect({
    href,
    locale: locale
  });
}