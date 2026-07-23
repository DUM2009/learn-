const LEVEL_XP_STEP = 100;
const PROFILE_STORAGE_PREFIX = 'explore_profile_';
const PROFILE_UPDATE_EVENT = 'explore:profile-updated';

function normalizeXPValue(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return 0;
    }

    return Math.floor(parsed);
}

function sanitizeObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function sanitizeProfile(rawProfile) {
    const profile = sanitizeObject(rawProfile);

    return {
        xp: normalizeXPValue(profile.xp),
        awardedSources: sanitizeObject(profile.awardedSources),
        migrations: sanitizeObject(profile.migrations)
    };
}

function getUserStorageKey(user) {
    if (user?.uid) {
        return `uid:${user.uid}`;
    }

    if (user?.email) {
        return `email:${String(user.email).toLowerCase()}`;
    }

    return 'guest';
}

function getProfileStorageKey(user) {
    return `${PROFILE_STORAGE_PREFIX}${getUserStorageKey(user)}`;
}

function getLevelFromXP(xp) {
    return Math.floor(normalizeXPValue(xp) / LEVEL_XP_STEP);
}

function getNextLevelThreshold(xp) {
    return (getLevelFromXP(xp) + 1) * LEVEL_XP_STEP;
}

function getProgressInCurrentLevel(xp) {
    return normalizeXPValue(xp) % LEVEL_XP_STEP;
}

function getProgressPercent(xp) {
    return (getProgressInCurrentLevel(xp) / LEVEL_XP_STEP) * 100;
}

function getProfileStats(profile) {
    const safeProfile = sanitizeProfile(profile);
    const level = getLevelFromXP(safeProfile.xp);

    return {
        xp: safeProfile.xp,
        level,
        nextLevelThreshold: getNextLevelThreshold(safeProfile.xp),
        progressInLevel: getProgressInCurrentLevel(safeProfile.xp),
        progressPercent: getProgressPercent(safeProfile.xp)
    };
}

function safelyParseJSON(rawValue) {
    if (!rawValue) {
        return null;
    }

    try {
        return JSON.parse(rawValue);
    } catch (error) {
        console.warn('Could not parse stored JSON data:', error);
        return null;
    }
}

function getLegacyMissionXP(storage) {
    if (!storage || typeof storage.length !== 'number' || typeof storage.key !== 'function') {
        return 0;
    }

    let totalXP = 0;

    for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (!key || !key.startsWith('mission_')) {
            continue;
        }

        const missionProgress = safelyParseJSON(storage.getItem(key));
        if (!missionProgress) {
            continue;
        }

        totalXP += normalizeXPValue(missionProgress.earnedXP);
    }

    return totalXP;
}

function migrateLegacyMissionXP(profile, storage) {
    const safeProfile = sanitizeProfile(profile);

    if (safeProfile.migrations.legacyMissionXpImported) {
        return { profile: safeProfile, changed: false };
    }

    const migratedXP = getLegacyMissionXP(storage);
    const nextProfile = {
        ...safeProfile,
        xp: safeProfile.xp + migratedXP,
        migrations: {
            ...safeProfile.migrations,
            legacyMissionXpImported: true
        }
    };

    return {
        profile: nextProfile,
        changed: migratedXP > 0
    };
}

function readProfile(storage, user) {
    const key = getProfileStorageKey(user);
    const storedProfile = sanitizeProfile(safelyParseJSON(storage?.getItem?.(key)));
    const migration = migrateLegacyMissionXP(storedProfile, storage);

    if (migration.changed) {
        writeProfile(storage, user, migration.profile);
    }

    return migration.profile;
}

function writeProfile(storage, user, profile) {
    if (!storage?.setItem) {
        return;
    }

    storage.setItem(getProfileStorageKey(user), JSON.stringify(sanitizeProfile(profile)));
}

function buildRewardSource(type, identifier) {
    return `${type}:${identifier}`;
}

function awardXP(profile, amount, source) {
    const safeProfile = sanitizeProfile(profile);
    const normalizedAmount = normalizeXPValue(amount);

    if (!normalizedAmount) {
        return {
            profile: safeProfile,
            awarded: false,
            xpAdded: 0
        };
    }

    if (source && safeProfile.awardedSources[source]) {
        return {
            profile: safeProfile,
            awarded: false,
            xpAdded: 0
        };
    }

    const nextProfile = {
        ...safeProfile,
        xp: safeProfile.xp + normalizedAmount,
        awardedSources: source
            ? { ...safeProfile.awardedSources, [source]: true }
            : { ...safeProfile.awardedSources }
    };

    return {
        profile: nextProfile,
        awarded: true,
        xpAdded: normalizedAmount
    };
}

function announceProfileUpdate(user, profile) {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') {
        return;
    }

    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, {
        detail: {
            userKey: getUserStorageKey(user),
            profile: sanitizeProfile(profile),
            stats: getProfileStats(profile)
        }
    }));
}

function awardXPToUser(user, amount, source, storage = typeof localStorage !== 'undefined' ? localStorage : null) {
    const currentProfile = readProfile(storage, user);
    const result = awardXP(currentProfile, amount, source);

    if (result.awarded) {
        writeProfile(storage, user, result.profile);
        announceProfileUpdate(user, result.profile);
    }

    return result;
}

function getCurrentUser() {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.exploreCurrentUser || null;
}

function getCurrentUserProfile(storage = typeof localStorage !== 'undefined' ? localStorage : null) {
    return readProfile(storage, getCurrentUser());
}

function awardXPToCurrentUser(amount, source, storage = typeof localStorage !== 'undefined' ? localStorage : null) {
    return awardXPToUser(getCurrentUser(), amount, source, storage);
}

const ProfileXP = {
    LEVEL_XP_STEP,
    PROFILE_UPDATE_EVENT,
    normalizeXPValue,
    sanitizeProfile,
    getUserStorageKey,
    getProfileStorageKey,
    getLevelFromXP,
    getNextLevelThreshold,
    getProgressInCurrentLevel,
    getProgressPercent,
    getProfileStats,
    getLegacyMissionXP,
    migrateLegacyMissionXP,
    readProfile,
    writeProfile,
    buildRewardSource,
    awardXP,
    awardXPToUser,
    getCurrentUserProfile,
    awardXPToCurrentUser
};

if (typeof window !== 'undefined') {
    window.ProfileXP = ProfileXP;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileXP;
}
