import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { showAdviceFriend } from "$lib/utils/adviceFriend";
import { chooseAnnouncementOnLoad } from "$lib/utils/announcements";
import { dailyEggFactRequired, tryShowDailyEggFact } from "$lib/utils/dailyFact";

const lsKey = "egdle2-settings";

const defaultSettings = {
  darkMode: false,
  firstVisit: true,
  announcements: [],
  seenGames: ["egdle"],
  lastVisit: new Date(),
};

export const settings = writable(structuredClone(defaultSettings));
export const appReady = writable(false);

try {
  if (!browser) throw new Error("Not a browser, skip loading settings");

  let parsedSettings = null;
  const storedSettings = localStorage.getItem(lsKey);

  if (storedSettings) {
    parsedSettings = JSON.parse(storedSettings);
  }

  if (parsedSettings) {
    settings.update((s) => {
      for (let key in parsedSettings) {
        if (key in defaultSettings) s[key] = parsedSettings[key];
        if (defaultSettings[key] instanceof Date) {
          s[key] = new Date(s[key]);
        }
      }

      return s;
    });
  }
} catch (e) {
  console.warn("Failed to restore settings from localStorage", e);
} finally {
  // subscribe an auto-saver
  if (browser) {
    settings.subscribe((s) => {
      localStorage.setItem(lsKey, JSON.stringify(s));
    });
  }

  // do first update
  settings.update((s) => {
    // validate according to default settings list
    for (let key in defaultSettings) {
      s[key] = key in s ? s[key] : defaultSettings[key];
    }

    if (s.firstVisit) {
      // first visit - autodetect some options
      s.firstVisit = false;
      s.announcements.push("firstReturnVisit"); // prevents "welcome back" message
    }

    setTimeout(() => {
      // loading finished, show announcements if any
      const adviceData = chooseAnnouncementOnLoad(s.announcements);
      if (adviceData.announce) {
        showAdviceFriend(adviceData.announce.text, adviceData.announce.header);
      }

      // if no announcements, show daily egg fact
      if (!adviceData.announce && dailyEggFactRequired(s.lastVisit)) {
        tryShowDailyEggFact();
      }

      // reset last visit date, and save everything
      settings.update((s) => {
        s.announcements = adviceData.seen;
        s.lastVisit = new Date();
        return s;
      });
    }, 100);

    return s;
  });

  // set ready flag to True as we finished parsing settings
  appReady.set(true);
}

/** @param {String} id */
export function recordSeenGame(id) {
  if (!id) return;

  settings.update((s) => {
    if (!s.seenGames.includes(id)) s.seenGames.push(id);
    return s;
  });
}

/** @param {Array<String>} annoList */
export function recordAnnouncements(...annoList) {
  if (!annoList.length) return;

  settings.update((s) => {
    annoList.flat().forEach((annoId) => {
      if (s.announcements.includes(annoId)) return;
      s.announcements.push(annoId);
    });
    return s;
  });
}
