import { inject, provideAppInitializer } from "@angular/core";
import { TranslocoService } from "@jsverse/transloco";
import { lastValueFrom } from "rxjs";

const DEFAULT_LANG = 'en';

async function preloadLanguage() {
  const translocoService = inject(TranslocoService);

  const defaultLang = DEFAULT_LANG;

  translocoService.setActiveLang(defaultLang);

  return await lastValueFrom(translocoService.load(defaultLang));
}

export function providePreloadLanguage() {
  return provideAppInitializer(preloadLanguage);
}
